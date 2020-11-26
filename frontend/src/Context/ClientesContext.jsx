import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";
import { InsertSchema, UpdateSchema } from "../Schemas/ClienteSchema";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const ClientesContext = createContext({});

const ClientesProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  const [errors, setErrors] = useState({});
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    Api.get("clientes")
      .then((resp) => {
        const { success, data } = resp.data;
        setLoading(false);
        console.log(resp);
        if (success) return setClientes(data);
        const error = new Error();
        return error.message("Erro em carregar clientes.");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        handleSnackBar({
          type: "error",
          message: "Erro em carregar clientes, Por favor tente mais tarde.",
        });
      });

    return function cleanup() {
      console.log("unmounted component");
      Api.default.source();
    };
  }, [setClientes, handleSnackBar, setLoading]);

  /**
   * Busca o cliente pelo ID.
   */
  const getCliente = useCallback(
    async (ID) => {
      try {
        setApiLoading(true);
        setErrors({});
        return Api.getByID("clientes", parseInt(ID)).then((resp) => {
          console.log(resp);
          const { success, data } = resp.data;
          if (!success) throw resp.data;
          setApiLoading(false);
          setCliente({ ...data, passwd: "******" });
          return;
        });
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: "Erro em buscar cliente.",
        });
      }
    },
    [handleSnackBar]
  );

  /**
   * Configura as actions de submit
   */
  const Actions = {
    async insert(cliente) {
      try {
        const data = await InsertSchema(cliente);
        if (data.error) throw data;
        const resp = await Api.insert("clientes", data);
        if (!resp.data.success) throw resp.data.error;
        setClientes((clientes) =>
          clientes.concat({ ...cliente, id: resp.data.data.id })
        );
        handleSnackBar({
          type: "success",
          message: "Cliente Inserido!",
        });
        return true;
      } catch (error) {
        console.log(error);
        if (error && error.errors) setErrors(error.errors);
        handleSnackBar({
          type: "error",
          message:
            error && error.message
              ? error.message
              : "Erro em inserir o cliente.",
        });
      }
    },
    async update(cliente) {
      try {
        const data = await UpdateSchema(cliente);
        if (data.error) throw data;
        const resp = await Api.update("clientes", data);
        if (!resp.data.success) throw resp.data.error;
        const newCliente = resp.data.data;
        setClientes((clientes) =>
          clientes.map((u) => (newCliente.id === u.id ? newCliente : u))
        );
        handleSnackBar({
          type: "success",
          message: "Informações do cliente alteradas!",
        });
        return true;
      } catch (error) {
        console.log(error);
        if (error && error.errors) setErrors(error.errors);
        handleSnackBar({
          type: "error",
          message:
            error && error.message
              ? error.message
              : "Erro em alterar o cliente.",
        });
      }
    },
    async disabled(cliente) {
      try {
        const resp = await Api.disabled("clientes", cliente.id);
        if (!resp.data.success) throw resp.data.error;
        const value = { ...cliente, actived: 0 };
        setClientes((clientes) =>
          clientes.map((u) => (value.id === u.id ? value : u))
        );
        handleSnackBar({
          type: "success",
          message: `Sucesso em desabilitar o cliente`,
        });
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: `Erro em desabilitar o cliente.`,
        });
      }
    },
    async actived(cliente) {
      try {
        const resp = await Api.actived("clientes", cliente.id);
        if (!resp.data.success) throw resp.data.error;
        const value = { ...cliente, actived: 1 };
        setClientes((clientes) =>
          clientes.map((u) => (value.id === u.id ? value : u))
        );
        handleSnackBar({
          type: "success",
          message: `Sucesso em habiltar o cliente`,
        });
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: `Erro em habilitar o cliente.`,
        });
      }
    },
  };

  /**
   * Trata as actions dos cliente
   * @param {string} type
   * @param {objeto} cliente
   */
  const handleActions = useCallback(
    async (type, cliente) => {
      const fn = Actions[type];
      setApiLoading(true);
      return await fn(cliente);
    },
    [Actions]
  );

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        setClientes,
        cliente,
        setCliente,
        errors,
        setErrors,
        getCliente,
        apiLoading,
        handleActions,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

ClientesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useClientes() {
  return useContext(ClientesContext);
}

export { ClientesContext, ClientesProvider };
