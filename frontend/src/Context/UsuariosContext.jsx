import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";
import {
	InsertSchema,
	UpdateSchema,
	DisabledSchema,
} from "../Schemas/UserSchema";
import { newArrayState } from "../Utils/functions";
import Masker from "../Utils/masker";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const UsuariosContext = createContext({});

const UsuariosProvider = ({ children }) => {
	const { handleSnackBar } = useSnackBar();
	const { setLoading } = useLoading();
	const [usuarios, setUsuarios] = useState([]);
	const [usuario, setUsuario] = useState({});
	const [errors, setErrors] = useState({});
	const [apiLoading, setApiLoading] = useState(false);

	/**
	 * Inicia os usuários e monta o componente.
	 */
	useEffect(
		() => {
			Api.get("usuarios")
				.then((resp) => {
					const { success, data } = resp.data;
					setLoading(false);
					console.log(data)
					if (success) return setUsuarios(data);
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
		[setUsuarios]
	);

	/**
	 * Busca o usuario ID no backend.
	 */
	const getUsuario = useCallback(
		async (ID) => {
			setApiLoading(true);
			try {
				Api.getOne("usuarios", parseInt(ID))
					.then((resp) => {
						setApiLoading(false);
						setUsuario({...resp.data.data, passwd: '******' });
					})
					.catch((error) => {
						throw error;
					});
			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: "Erro em buscar usuário.",
				});
			}
		},
		[usuario, handleSnackBar]
	);

	/**
	 * Trata quando usuário digita no teclado
	 * @param {object} event
	 */
	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setUsuario({
			...usuario,
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
			setUsuario({});
			setLoading(false);
			setOpen(false);
		})
	};


	/**
	 * Configura as actions de submit
	 */
	const Actions = {
		async insert() {
			try {
				const data = await InsertSchema(usuario);
				if (data.error) throw data.errors;
				const resp = await Api.insert("usuarios", data);
				if (!resp.data.success) throw resp.data.error;
				setUsuarios((usuarios) =>
					usuarios.concat({ ...usuario, id: resp.data.data })
				);
				handleSnackBar({
					type: "success",
					message: "Usuario Inserido!",
				});
			} catch (error) {
				console.log(error);
				setErrors(error);
				handleSnackBar({
					type: "error",
					message: "Erro alterar o usuario.",
				});
				throw error;
			}
		},
		async update() {
			try {
				const data = await UpdateSchema(usuario);
				if (data.error) throw data.errors;
				const resp = await Api.update("usuarios", data);
				if (!resp.data.success) throw resp.data.error;
				const newUser = resp.data.data;
				setUsuarios(usuarios => usuarios.map(u => newUser.id === u.id ? newUser : u));
				handleSnackBar({
					type: "success",
					message: "Informações do usuario alteradas!",
				});
			} catch (error) {
				console.log(error);
				setErrors(error);
				handleSnackBar({
					type: "error",
					message: "Erro alterar o usuario.",
				});
				throw error;
			}
		},
		async disabled() {
			try {
				const resp = await Api.disabled("usuarios", usuario.id)
				if (!resp.data.success) throw resp.data.error;
				const newUser = { ...usuario, actived: 0 };
				setUsuarios(clientes => clientes.map(u => newUser.id === u.id ? newUser : u));
				handleSnackBar({
					type: "success",
					message: `Sucesso em desabilitar o usuário`,
				});

			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: `Erro em desabilitar o usuário.`,
				});
				throw error;
			}
		},
		async actived() {
			try {
				const resp = await Api.actived("usuarios", usuario.id)
				if (!resp.data.success) throw resp.data.error;
				const newUser = { ...usuario, actived: 1 };
				setUsuarios(clientes => clientes.map(u => newUser.id === u.id ? newUser : u));
				handleSnackBar({
					type: "success",
					message: `Sucesso em habiltar o usuário`,
				});

			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: `Erro em habilitar o usuário.`,
				});
				throw error;
			}
		},
	}

	const clearUsuario = () => {
		setUsuario({});
		setErrors({});
	};

	/**
	 * Provider
	 */
	return (
		<UsuariosContext.Provider
			value={{
				usuarios,
				setUsuarios,
				usuario,
				setUsuario,
				errors,
				setErrors,
				getUsuario,
				apiLoading,
				clearUsuario,
				handleActions,
				handleChange,
			}}
		>
			{children}
		</UsuariosContext.Provider>
	);
};

export default function useUsuarios() {
	return useContext(UsuariosContext);
}

export { UsuariosContext, UsuariosProvider };

UsuariosProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
