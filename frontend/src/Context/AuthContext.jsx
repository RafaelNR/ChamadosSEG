import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import * as Api from "../Api/Auth";
import PropTypes from "prop-types";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(localStorage.getItem("user"));

	/**
	 ** Carrrega sempre que o provider é chamado
	 */
	useEffect(() => {
		isAuth();

		return () => {
			return;
		}
		//react-hooks/exhaustive-deps
	}, []);


	/**
	 ** Efetua a função de logar.
	 * @param {string} userLogin
	 * @param {string} passwd
	 */
	const handleLogin = useCallback(async (userLogin, passwd) => {
		console.log(userLogin, passwd);
		try {
			const response = await Api.Login(userLogin, passwd);
			console.log(response);
			if (response.data.success) {
				localStorage.setItem("token", JSON.stringify(response.data.token));
				localStorage.setItem("user", JSON.stringify(response.data.user));
				setUser(response.data.user);
				setToken(response.data.token);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	/**
	 *& Trata o logout
	 */
	const handleLogout = useCallback(() => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	}, []);


	/**
	 ** Verifica se o token ainda é valido;
	 ** Só executa novamente quando token é chamado;
	 */
	const isAuth = React.useCallback( async() => {
		if (!token || token === "undefined") handleLogout();
		
		const resp = await Api.Auth();
		console.log(resp)
		if (!resp.data.auth) handleLogout();

	},[token, handleLogout]);


	/**
	 ** Provider
	 */
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
