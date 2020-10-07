import React, {
	createContext,
	useContext,
	useCallback,
	useState,
	useEffect,
} from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";
import {
	InsertSchema,
	UpdateSchema,
	DisabledSchema,
} from "../Schemas/ClienteSchema";
import Masker from "../Utils/masker";

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

	/**
	 * Inicia os clientes e monta o componentes.
	 */
	useEffect(
		() => {
			Api.get("clientes")
				.then((resp) => {
					const { success, data } = resp.data;
					setLoading(false);
					if (success) return setClientes(data);
					throw "Erro em carregar usuários.";
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
				Api.source().cancel();
			};
		},
		// eslint-disable-next-line
		[setClientes]
	);

	/**
	 * Busca o cliente
	 */
	const getCliente = useCallback(
		(ID) => {
			setApiLoading(true);
			try {
				Api.getOne("clientes", parseInt(ID))
					.then((resp) => {
						setApiLoading(false);
						setCliente(resp.data.data);
					})
					.catch((error) => {
						throw error;
					});
			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: "Erro em buscar cliente.",
				});
			}
		},
		[cliente, handleSnackBar]
	);

	/**
	 * Trata quando usuário digita no teclado
	 * @param {object} event
	 */
	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setCliente({
			...cliente,
			[key]: Masker(value, key),
		});
	};

	/**
	 * Trata as actions dos cliente
	 * @param {function} setOpen
	 * @param {function} setLoading
	 * @param {string} type
	 */
	const handleActions = (setOpen, setLoading, type) => {
		setLoading(true);
		const fn = Actions[type];
		return fn().then(() => {
			setCliente({});
			setLoading(false);
			setOpen(false);
		})
	};

	const Actions = {
		async insert(){
			try {
				const data = await InsertSchema(cliente);
				if (data.error) throw data.errors;
				const resp = await Api.insert("clientes", data);
				if (!resp.data.success) throw resp.data.error;
				setClientes((clientes) =>
					clientes.concat({ ...cliente, id: resp.data.data })
				);
				handleSnackBar({
					type: "success",
					message: "Cliente Inserido!",
				});
			} catch (error) {
				console.log(error);
				setErrors(error);
				handleSnackBar({
					type: "error",
					message: "Erro alterar o cliente.",
				});
				throw error;
			}
		},
		async update(){
			try {
				const data = await UpdateSchema(cliente);
				if (data.error) throw data.errors;

				const resp = await Api.update("clientes", data);
				if (!resp.data.success) throw resp.data.error;
				const newCliente = resp.data.data;
				setClientes((clientes) =>
					clientes.map(c => newCliente === c.id ? newCliente : c )
				);
				handleSnackBar({
					type: "success",
					message: "Informações do cliente alteradas!",
				});
			} catch (error) {
				console.log(error);
				setErrors(error);
				handleSnackBar({
					type: "error",
					message: "Erro alterar o cliente.",
				});
				throw error;
			}
		}
	}

	/**
	 * Lista dos dados do cliente.
	 */
	const clearCliente = () => {
		setCliente({});
		setErrors({});
	};

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
				clearCliente,
				handleChange,
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

