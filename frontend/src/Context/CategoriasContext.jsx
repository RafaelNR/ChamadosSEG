import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import * as Crud from "../Api/Crud";
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
      let render = true;
      setLoading(true);

      (async () => {
        try {
          const Dados = await Crud.get('categorias');
          const { success, data } = Dados.data;
          if (success && render) return setCategorias(data);
          throw new Error(data.message);
        } catch (error) {
          console.log(error);
          handleSnackBar({
            type: 'error',
            message: error && error.message ? error.message : 'Erro em carregar categorias, Por favor tente mais tarde.'
          });
        } finally {
          setLoading(false);
        }
      })();

      return function cleanup() {
        render = false;
      };
    },
    // eslint-disable-next-line
    []
  );

  const getCategoria = useCallback(
    async (ID) => {
      try {
        setApiLoading(true);
        setErrors({});
        const resp = await Crud.getByID('categorias', parseInt(ID));
        const { success, data } = resp.data;
        if (!success) throw data;
        setCategoria(data.subCategorias ? { ...data, subCategorias:data.subCategorias.map((sub) => sub.id) } : data);
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: (error && error.message) || 'Erro em buscar categoria.'
        });
      } finally {
        setApiLoading(false);
      }
    },
    [handleSnackBar]
  );

  const Actions = {
    async insert(categoria) {
      try {
        const data = await InsertSchema(categoria);
        if (data.error) throw data;
        const resp = await Crud.insert("categorias", data);
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
          type: 'error',
          message: (error && error.message) || 'Erro em inserir a categoria.'
        });
      }
    },
    async update(Categoria) {
      try {
        const data = await UpdateSchema(Categoria);
        if (data.error) throw data;
        const resp = await Crud.update("categorias", data);
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
          type: 'error',
          message: (error && error.message) || 'Erro em alterar a categoria.'
        });
      }
    },
    async delete(Categoria) {
      try {
        const resp = await Crud.deletar("Categorias", Categoria.id);
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
          type: 'error',
          message: error && error.message || `Erro em deletar categoria.`
        });
      }
    },
  };

  const handleActions = useCallback((type, categoria) => {
      const fn = Actions[type];
      setApiLoading(true);
      return fn(categoria);
  },[])

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
