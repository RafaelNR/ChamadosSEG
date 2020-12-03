import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";
import { InsertSchema, UpdateSchema } from "../Schemas/CategoriaSchema";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const CategoriasContext = createContext({});

const CategoriasProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({});
  const [errors, setErrors] = useState({});
  const [apiLoading, setApiLoading] = useState();

  useEffect(
    () => {
      async function init() {
        await Api.get("categorias")
          .then((resp) => {
            const { success, data } = resp.data;
            if (success) return setCategorias(data);
            setLoading(false);
            throw { success: false, message: resp.data.message};
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            handleSnackBar({
              type: "error",
              message: error.message ? error.message :
                "Erro em carregar categorias, Por favor tente mais tarde.",
            });
          });
      }

      init();

      return function cleanup() {
        console.log("unmounted Categoria");
        Api.default.source();
      };
    },
    [handleSnackBar,setLoading]
  );

  const getCategoria = useCallback(
    async (ID) => {
      try {
        setApiLoading(true);
        setErrors({});
        return Api.getByID("categorias", parseInt(ID)).then((resp) => {
          const { success, data } = resp.data;
          if (!success) throw resp.data;
          setApiLoading(false);
          setCategoria(data);
          return;
        });
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: "Erro em buscar categoria.",
        });
      }
    },
    [handleSnackBar]
  );

  const Actions = {
    async insert(categoria) {
      try {
        const data = await InsertSchema(categoria);
        if (data.error) throw data;
        const resp = await Api.insert("categorias", data);
        if (!resp.data.success) throw resp.data;
        console.log(resp.data.data);
        setCategorias((values) => values.concat(resp.data.data));
        handleSnackBar({
          type: "success",
          message: "Categoria Inserida!",
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
              : "Erro em inserir a categoria.",
        });
      }
    },
    async update(Categoria) {
      try {
        const data = await UpdateSchema(Categoria);
        if (data.error) throw data;
        const resp = await Api.update("categorias", data);
        if (!resp.data.success) throw resp.data.error;
        const newData = resp.data.data;
        console.log(newData);
        setCategorias((categorias) =>
          categorias.map((c) => (newData.id === c.id ? newData : c))
        );
        handleSnackBar({
          type: "success",
          message: "Informações da categorias alteradas!",
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
              : "Erro em alterar a categoria.",
        });
      }
    },
    async delete(Categoria) {
      try {
        const resp = await Api.deletar("Categorias", Categoria.id);
        if (!resp.data.success) throw resp.data.error;
        setCategorias((Categorias) =>
          Categorias.filter((c) => Categoria.id !== c.id)
        );
        handleSnackBar({
          type: "success",
          message: `Sucesso em deletar categoria`,
        });
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: `Erro em deletar categoria.`,
        });
      }
    },
  };

  const handleActions = (type, categoria) => {
      const fn = Actions[type];
      setApiLoading(true);
      return fn(categoria);
  }

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        setCategorias,
        categoria,
        setCategoria,
        errors,
        setErrors,
        apiLoading,
        getCategoria,
        handleActions,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export default function useCategorias() {
  return useContext(CategoriasContext);
}

export { CategoriasContext, CategoriasProvider };

CategoriasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
