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
import { SnackBarContext } from "./SnackBarContext";

const UsuariosContext = createContext({});

const UsuariosProvider = ({ children }) => {
	const { handleSnackBar } = useContext(SnackBarContext);
	const [usuarios, setUsuarios] = useState([]);
	const [usuario, setUsuario] = useState({});
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState({});

	/**
	 * Inicia os usuários
	 */
	useEffect(() => {
		Api.get("usuarios")
			.then((resp) => {
				const { success, data } = resp.data;
				if (success) {
					setLoading(false);
					setUsuarios(data);
				}
			})
			.catch((resp) => {
				console.log(resp);
			});
	}, [usuario]);

	/**
	 * Busca o usuario ID no backend.
	 */
	const getUsuario = useCallback(
		async (ID) => {
			try {
				const resp = await Api.getOne("usuarios", parseInt(ID));
				const dbUsuario = resp.data.data;
				setUsuario({ ...dbUsuario, passwd: "******" });
			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: "Erro em buscar usuário.",
				});
			}
		},
		[setUsuario, handleSnackBar]
	);

	/**
	 * Trata o envio do form
	 */
	const handleSubmit = (setOpenDialog, setDialogLoading, type) => {
		setDialogLoading(true);
		switch (type) {
			case "insert":
				return insertUser()
					.then((resp) => {
						console.log(resp);
						setDialogLoading(false);
						setOpenDialog(false);
						setUsuario({});
						handleSnackBar({
							type: "success",
							message: "Usuário inserido!",
						});
					})
					.catch(() => {
						setDialogLoading(false);
					});
			case "update":
				return updateUser()
					.then(() => {
						setDialogLoading(false);
						setOpenDialog(false);
						setUsuario({});
						handleSnackBar({
							type: "success",
							message: "Informações do usuário alteradas!",
						});
					})
					.catch(() => {
						setDialogLoading(false);
					});

			case "disabled":
				return disabledUser()
					.then(() => {
						setDialogLoading(false);
						setOpenDialog(false);
						setUsuario({});
						handleSnackBar({
							type: "success",
							message: "Usuário desabilitado!",
						});
					})
					.catch(() => {
						setDialogLoading(false);
					});
				return;

			case "actived":
				return activedUser()
					.then(() => {
						setDialogLoading(false);
						setOpenDialog(false);
						setUsuario({});
						handleSnackBar({
							type: "success",
							message: "Usuário Habilitado!",
						});
					})
					.catch(() => {
						setDialogLoading(false);
					});

			default:
				handleSnackBar({
					type: "error",
					message: "Erro em fazer a ação.",
				});
				break;
		}
	};

	/**
	 * Faz insert das informações, mas primeiro trata os dados
	 */
	const insertUser = async () => {
		return InsertSchema(usuario).then(async (newUsuario) => {
			if (newUsuario.error) throw setErrors(newUsuario.errors);

			try {
				const resp = await Api.insert("usuarios", newUsuario);
				if (!resp.data.success) throw resp.data.error;
				return resp.data;
			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: "Erro em inserir o usuário.",
				});
				throw error;
			}
		});
	};

	/**
	 * Faz update das informações, mas primeiro trata os dados
	 */
	const updateUser = async () => {
		return UpdateSchema(usuario).then(async (user) => {
			if (user.error) throw setErrors(user.errors);

			try {
				const resp = await Api.update("usuarios", user);
				if (!resp.data.success) throw resp.data.error;
				return resp.data;
			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: "Erro alterar o usuário.",
				});
				throw error;
			}
		});
	};

	/**
	 * Desabilita o usuário selecionado
	 */
	const disabledUser = async () => {
		return DisabledSchema(usuario.id).then(async (ID) => {
			try {
				const resp = await Api.disabled("usuarios", ID);
				console.log(resp);
				if (!resp.data.success) throw resp.data.error;
				return resp.data;
			} catch (error) {
				console.log(error);
				handleSnackBar({
					type: "error",
					message: "Erro em desabilitar o usuário.",
				});
				throw error;
			}
		});
	};

	/**
	 * Ative o usuário selecionado
	 */
	const activedUser = async () => {
		try {
			const resp = await Api.actived("usuarios", usuario.id);
			if (!resp.data.success) throw resp.data.error;
			return resp.data;
		} catch (error) {
			console.log(error);
			handleSnackBar({
				type: "error",
				message: "Erro em habilitar usuário.",
			});
			throw error;
		}
	};

	/**
	 * Provider
	 */
	return (
		<UsuariosContext.Provider
			value={{
				loading,
				usuarios,
				setUsuarios,
				usuario,
				setUsuario,
				errors,
				setErrors,
				getUsuario,
				handleSubmit,
			}}
		>
			{children}
		</UsuariosContext.Provider>
	);
};

UsuariosProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { UsuariosContext, UsuariosProvider };
