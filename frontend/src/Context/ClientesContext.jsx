import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import * as Crud from "../Api/Crud";
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
    let render = true;
    setLoading(true);

    (async () => {
      try {
        const Dados = await Crud.get('clientes');
        const { success, data } = Dados.data;
        if (success && render) return setClientes(data);
        throw new Error(data.message);
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: error.message
            ? error.message
            : 'Erro em carregar clientes, Por favor tente mais tarde.'
        });
      } finally {
        setLoading(false);
      }
    })();

    return function cleanup() {
      render = false;
      Crud.default.cancel('ClienteContext unmounted');
    };
    // eslint-disable-next-line
  }, []);

  /**
   * Busca o cliente pelo ID.
   */
  const getCliente = useCallback(
    async (ID) => {
      try {
        setApiLoading(true);
        setErrors({});
        return Crud.getByID("clientes", parseInt(ID)).then((resp) => {
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
        const resp = await Crud.insert("clientes", data);
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
        const resp = await Crud.update("clientes", data);
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
        const resp = await Crud.disabled("clientes", cliente.id);
        if (!resp.data.success) throw resp.data;
        const value = { ...cliente, actived: 0 };
        setClientes((clientes) =>
          clientes.map((u) => (value.id === u.id ? value : u))
        );
        handleSnackBar({
          type: "success",
          message: `Sucesso em desabilitar o cliente`,
        });
        return true;
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: error.message ? error.message : `Erro em desabilitar o cliente.`,
        });
        return false;
      }
    },
    async actived(cliente) {
      try {
        const resp = await Crud.actived("clientes", cliente.id);
        if (!resp.data.success) throw resp.data.error;
        const value = { ...cliente, actived: 1 };
        setClientes((clientes) =>
          clientes.map((u) => (value.id === u.id ? value : u))
        );
        handleSnackBar({
          type: "success",
          message: `Sucesso em habiltar o cliente`,
        });
        return true;
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: error.message ? error.message :`Erro em habilitar o cliente.`,
        });
        return false;
      }
    },
  };


  const handleActions = (type, cliente) => {
    console.log(type,cliente)
    const fn = Actions[type];
    setApiLoading(true);
    return fn(cliente);
  }

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
