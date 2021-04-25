import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import * as Crud from "../Api/Crud";
import { InsertSchema, UpdateSchema } from "../Schemas/SubCategorias.Schema";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const SubCategoriasContext = createContext({});

const SubCategoriasProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const [subcategorias, setSubCategorias] = useState([]);
  const [subcategoria, setSubCategoria] = useState({});
  const [errors, setErrors] = useState({});
  const [apiLoading, setApiLoading] = useState();


  useEffect(() => {
    let render = true;

    (async () => {
      try {
        const Dados = await Crud.get('subcategorias');
        const { success, data } = Dados.data;
        if (success && render) return setSubCategorias(data);
        throw new Error(data.message);
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: error.message
            ? error.message
            : 'Erro em carregar sub-categorias, Por favor tente mais tarde.'
        });
      } finally {
        setLoading(false);
      }
    })();

    return function cleanup() {
      render = false;
      Crud.default.cancel('SubCategoriaContext unmonted');
    };
    // eslint-disable-next-line
  },[]);

  const getSubCategoria = useCallback(
    async (ID) => {
      try {
        setApiLoading(true);
        setErrors({});
        return Crud.getByID("subcategorias", parseInt(ID)).then((resp) => {
          const { success, data } = resp.data;
          if (!success) throw resp.data;
          setApiLoading(false);
          setSubCategoria(data);
          return;
        });
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: "error",
          message: "Erro em buscar subcategoria.",
        });
      }
    },
    [handleSnackBar]
  );

  const Actions = {
    async insert(subcategoria) {
      try {
        const data = await InsertSchema(subcategoria);
        if (data.error) throw data;
        const resp = await Crud.insert('subcategorias', data);
        if (!resp.data.success) throw resp.data;
        console.log(resp.data.data);
        setSubCategorias((values) => values.concat(resp.data.data));
        handleSnackBar({
          type: 'success',
          message: 'SubCategoria Inserida!'
        });
        return true;
      } catch (error) {
        console.log(error);
        if (error && error.errors) setErrors(error.errors);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : 'Erro em inserir a subcategoria.'
        });
      }
    },
    async update(subcategoria) {
      try {
        const data = await UpdateSchema(subcategoria);
        if (data.error) throw data;
        const resp = await Crud.update('subcategorias', data);
        if (!resp.data.success) throw resp.data;
        const newData = resp.data.data;
        setSubCategorias((subs) =>
          subs.map((s) => (newData.id === s.id ? newData : s))
        );
        handleSnackBar({
          type: 'success',
          message: 'Informações da subcategorias alteradas!'
        });
        return true;
      } catch (error) {
        console.log(error);
        if (error && error.errors) setErrors(error.errors);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : 'Erro em alterar a subcategoria.'
        });
      }
    },
    async delete(subCategoria) {
      try {
        const resp = await Crud.deletar('subcategorias', subCategoria.id);
        console.log(resp)
        if (!resp.data.success) throw resp.data;
        setSubCategorias((subCategorias) =>
          subCategorias.filter((c) => subCategoria.id !== c.id)
        );
        handleSnackBar({
          type: 'success',
          message: `Sucesso em deletar a Sub-Categoria`
        });
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : 'Erro em deletar a Sub-Categoria.'
        });
      }
    }
  };

  const handleActions = (type, subCategoria) => {
      const fn = Actions[type];
      setApiLoading(true);
      return fn(subCategoria);
  }

  return (
    <SubCategoriasContext.Provider
      value={{
        subcategorias,
        setSubCategorias,
        subcategoria,
        setSubCategoria,
        errors,
        setErrors,
        apiLoading,
        getSubCategoria,
        handleActions,
      }}
    >
      {children}
    </SubCategoriasContext.Provider>
  );
};

export default function useSubCategorias() {
  return useContext(SubCategoriasContext);
}

SubCategoriasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SubCategoriasContext, SubCategoriasProvider };
