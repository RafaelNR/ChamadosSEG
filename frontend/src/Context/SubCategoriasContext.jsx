import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";
import { InsertSchema, UpdateSchema } from "../Schemas/SubCategorias.Schema";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const SubCategoriasContext = createContext({});

const SubCategoriasProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { loading, setLoading } = useLoading();
  const [subcategorias, setSubCategorias] = useState([]);
  const [subcategoria, setSubCategoria] = useState({});
  const [errors, setErrors] = useState({});
  const [apiLoading, setApiLoading] = useState();

  /**
   ** Inicia os dados da subcategorias
   */
  useEffect(
    () => {
      async function init() {
        await Api.get("subcategorias")
          .then((resp) => {
            console.log(resp);
            const { success, data } = resp.data;
            if (success) return setSubCategorias(data);
            setLoading(false);
            throw "Erro em carregar sub-categorias.";
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            handleSnackBar({
              type: "error",
              message:
                "Erro em carregar sub-categorias, Por favor tente mais tarde.",
            });
          });
      }

      init();

      return function cleanup() {
        console.log("unmounted component");
        return Api.default.source();
      };
    },
    // eslint-disable-next-line
    []
  );

  /**
   ** BUSCA SUBCATEGORIA PELO ID
   */
  const getSubCategoria = useCallback(
    async (ID) => {
      try {
        setApiLoading(true);
        setErrors({});
        return Api.getByID("subcategorias", parseInt(ID)).then((resp) => {
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

  /**
   ** ACTIONS
   */
  const Actions = {
    async insert(subcategoria) {
      try {
        const data = await InsertSchema(subcategoria);
        if (data.error) throw data;
        const resp = await Api.insert("subcategorias", data);
        if (!resp.data.success) throw resp.data;
        console.log(resp.data.data);
        setSubCategorias((values) => values.concat(resp.data.data));
        handleSnackBar({
          type: "success",
          message: "SubCategoria Inserida!",
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
              : "Erro em inserir a subcategoria.",
        });
      }
    },
    async update(subcategoria) {
      try {
        const data = await UpdateSchema(subcategoria);
        if (data.error) throw data;
        const resp = await Api.update("subcategorias", data);
        if (!resp.data.success) throw resp.data.error;
        const newData = resp.data.data;
        setSubCategorias((subs) =>
          subs.map((s) => (newData.id === s.id ? newData : s))
        );
        handleSnackBar({
          type: "success",
          message: "Informações da subcategorias alteradas!",
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
              : "Erro em alterar a subcategoria.",
        });
      }
    },
    // async delete(Categoria) {
    // 	try {
    // 		const resp = await Api.deletar("Categorias", Categoria.id)
    // 		if (!resp.data.success) throw resp.data.error;
    // 		setCategorias(Categorias => Categorias.filter(c => Categoria.id != c.id));
    // 		handleSnackBar({
    // 			type: "success",
    // 			message: `Sucesso em deletar categoria`,
    // 		});
    // 	} catch (error) {
    // 		console.log(error);
    // 		handleSnackBar({
    // 			type: "error",
    // 			message: `Erro em deletar categoria.`,
    // 		});
    // 	}
    // },
  };

  /**
   ** Trata as actions dos cliente
   * @param {string} type
   * @param {objeto} categoria
   */
  const handleActions = useCallback(
    (type, categoria) => {
      const fn = Actions[type];
      setApiLoading(true);
      return fn(categoria);
    },
    [Actions]
  );

  /**
   * Provider
   */
  return (
    <SubCategoriasContext.Provider
      value={{
        subcategorias,
        setSubCategorias,
        subcategoria,
        setSubCategoria,
        errors,
        setErrors,
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
