import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const AtividadesContext = createContext({});

const AtividadesProvider = ({ children }) => {
	const { handleSnackBar } = useSnackBar();
	const { setLoading } = useLoading();
	const [atividades, setAtividades] = useState([]);
	const [atividade, setAtividade] = useState({});
	const [errors, setErrors] = useState({});
  const [apiLoading, setApiLoading] = useState(false);
  
  useEffect(() => { 
			async function init (){
				try {
					const resp = await Api.get('atividades/user');
					const { success, data } = resp.data;
					if (!success) throw resp.data.message;
					setLoading(false);
					setAtividades(data);
				} catch (error) {
					console.log(error);
					setLoading(false);
					handleSnackBar({
						type: "error",
						message: "Erro em carregar atividades, Por favor tente mais tarde.",
					});
				}
			}
			
			init();
			
			return function cleanup() {
				console.log("unmounted component");
				Api.default.source();
			};

		},[]);


	// const getUsuario = useCallback(
	// 	async (ID) => {
	// 		try {
	// 			setApiLoading(true);
	// 			setErrors({})
	// 			return Api.getByID("usuarios", parseInt(ID))
	// 				.then((resp) => {
	// 					const { success, data } = resp.data;
	// 					if (!success) throw resp.data;

	// 					setApiLoading(false);
	// 					setUsuario({...data, passwd: '******' });
	// 					return;
						
	// 				})
	// 		} catch (error) {
	// 			console.log(error);
	// 			handleSnackBar({
	// 				type: "error",
	// 				message: "Erro em buscar usuário.",
	// 			});
	// 		}
	// 	},
	// 	[handleSnackBar]
	// );

	// const Actions = {
	// 	async insert(usuario) {
	// 		try {
	// 			const data = await InsertSchema(usuario);
	// 			if (data.error) throw data;
	// 			const resp = await Api.insert("usuarios", data);
	// 			if (!resp.data.success) throw resp.data;
	// 			console.log(resp.data.data)
	// 			setUsuarios((usuarios) =>
	// 				usuarios.concat({ ...usuario, id: resp.data.data.id })
	// 			);
	// 			handleSnackBar({
	// 				type: "success",
	// 				message: "Usuario Inserido!",
	// 			});
	// 			return true;
	// 		} catch (error) {
	// 			console.log(error);
	// 			if(error && error.errors) setErrors(error.errors);
	// 			handleSnackBar({
	// 				type: "error",
	// 				message: error && error.message 
	// 												? error.message 
	// 												: "Erro em inserir o usuario.",
	// 			});
	// 		}
	// 	},
	// 	async update(usuario) {
	// 		try {
	// 			console.log(usuario)
	// 			const data = await UpdateSchema(usuario);
	// 			console.log(data)
	// 			if (data.error) throw data;
	// 			const resp = await Api.update("usuarios", data);
	// 			if (!resp.data.success) throw resp.data.error;
	// 			const newUser = resp.data.data;
	// 			setUsuarios(usuarios => usuarios.map(u => newUser.id === u.id ? newUser : u));
	// 			handleSnackBar({
	// 				type: "success",
	// 				message: "Informações do usuario alteradas!",
	// 			});
	// 			return true;
	// 		} catch (error) {
	// 			console.log(error)
	// 			if(error && error.errors) setErrors(error.errors);
	// 			handleSnackBar({
	// 				type: "error",
	// 				message: error && error.message 
	// 												? error.message 
	// 												: "Erro em alterar o usuario.",
	// 			});
	// 		}
	// 	},
	// 	async disabled(usuario) {
	// 		try {
	// 			const resp = await Api.disabled("usuarios", usuario.id)
	// 			if (!resp.data.success) throw resp.data.error;
	// 			const newUser = { ...usuario, actived: 0 };
	// 			setUsuarios(usuarios => usuarios.map(u => newUser.id === u.id ? newUser : u));
	// 			handleSnackBar({
	// 				type: "success",
	// 				message: `Sucesso em desabilitar o usuário`,
	// 			});
	// 		} catch (error) {
	// 			console.log(error);
	// 			handleSnackBar({
	// 				type: "error",
	// 				message: `Erro em desabilitar o usuário.`,
	// 			});
	// 		}
	// 	},
	// 	async actived(usuario) {
	// 		try {
	// 			const resp = await Api.actived("usuarios", usuario.id)
	// 			if (!resp.data.success) throw resp.data.error;
	// 			const newUser = { ...usuario, actived: 1 };
	// 			setUsuarios(usuarios => usuarios.map(u => newUser.id === u.id ? newUser : u));
	// 			handleSnackBar({
	// 				type: "success",
	// 				message: `Sucesso em habiltar o usuário`,
	// 			});
	// 		} catch (error) {
	// 			console.log(error);
	// 			handleSnackBar({
	// 				type: "error",
	// 				message: `Erro em habilitar o usuário.`,
	// 			});
	// 		}
	// 	},
	// }

	// const handleActions = useCallback((type, usuario) => {
	// 	const fn = Actions[type];
	// 	setApiLoading(true);
	// 	return fn(usuario);
	// }, [Actions]);

	return (
		<AtividadesContext.Provider
      value={{
        atividades
			}}
		>
			{children}
		</AtividadesContext.Provider>
	);
};

export default function useAtividades() {
	return useContext(AtividadesContext);
}

export { AtividadesContext, AtividadesProvider };

AtividadesProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
