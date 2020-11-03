import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import * as Auth from "../Api/Auth";
import * as Api from "../Api/Crud";
import PropTypes from "prop-types";
import useLocalStore from '../Hooks/useLocalStore';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const { getData, setData, removeData } = useLocalStore();
	const [token, setToken] = useState(getData('token'));
	const [user, setUser] = useState(getData('user'));

	const handleLogin = useCallback(async (userLogin, passwd) => {
		try {
			const response = await Auth.Login(userLogin, passwd);
			console.log(response)
			if (response.data.success) {
				setData('token', response.data.data.token)	
				setData('user', await getUsuario(response.data.data.user_id))
				setUser(response.data.data.user);
				setToken(response.data.data.token);
				window.location.replace('/')
			}
		} catch (error) {
			console.log(error);
			// TODO tratar os erros na tela.
		}
	}, [setData]);


	const handleLogout = useCallback(() => {
		setUser(null);
		setToken(null);
		removeData('token');
		removeData('user');
		Auth.removeToken();
	}, [removeData]);

	const getUsuario = useCallback(
		async (ID) => {
			try {
				return Api.getByID("usuarios", parseInt(ID))
					.then((resp) => {
						const { success, data } = resp.data;
						if (!success) throw resp.data;
						return data;				
					})
			} catch (error) {
				console.log(error);
			}
		},
		[]
	);


	useEffect(() => {

		async function isAuth (){

			if (!token || token === "undefined") {
				console.log('token não encontrado');
				return handleLogout();
			}
			
			if (!user || user === 'undefined' || !user.nome) {
				console.log('user não encontrado')
				return handleLogout();
			}

			
			const resp = await Auth.Auth();
			console.log(resp)
			if (!resp.data.auth) handleLogout();

		};

		isAuth();

	},[]);
	

	return (
		<AuthContext.Provider
			value={{ logado: Boolean(user), user, handleLogin, handleLogout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function useAuth() {
	return useContext(AuthContext);
}

export { AuthContext, AuthProvider };
