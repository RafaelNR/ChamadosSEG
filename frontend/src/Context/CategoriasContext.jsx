import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";
import {
	InsertSchema,
	UpdateSchema,
	DisabledSchema,
} from "../Schemas/ClienteSchema";
import { newArrayState } from "../Utils/functions";
import Masker from "../Utils/masker";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";


const CategoriasContext = createContext({});

const CategoriasProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({});
  const [errors, setErrors] = useState({});
  const [apiLoading, setApiLoading] = useState(false);
	/**
	 * Inicia os clientes e monta o componentes.
	 */
	useEffect(() => {

		async function init() {

			await Api.get("categorias")
				.then((resp) => {
					const { success, data } = resp.data;
					console.log(data)
					if (success) return setCategorias(data);
					setLoading(false);
					throw "Erro em carregar categorias.";
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
					handleSnackBar({
						type: "error",
						message: "Erro em carregar categorias, Por favor tente mais tarde.",
					});
				});
		}

		init();
		
		return function cleanup() {
			console.log("unmounted component");
			Api.source().cancel();
		};
	},
		// eslint-disable-next-line
    []
	);

	/**
	 * Busca o cliente
	 */
	const getCategoria = useCallback(
		(ID) => {
			setApiLoading(true);
			try {
				Api.getOne("categorias", parseInt(ID))
					.then((resp) => {
						setApiLoading(false);
						setCategoria(resp.data.data);
					})
					.catch((error) => {
						throw error;
					});
			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: "Erro em buscar categoria.",
				});
			}
		},
		[categoria, handleSnackBar]
	);

	/**
	 * Provider
	 */
	return (
    <CategoriasContext.Provider value={{
      categorias,
      setCategorias,
      categoria,
      setCategoria,
      errors,
      setErrors,
      getCategoria
		}}>
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
