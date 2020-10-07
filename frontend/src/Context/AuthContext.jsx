import React, { createContext, useState, useEffect, useContext } from "react";
import * as Api from "../Api/Auth";
import PropTypes from "prop-types";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(localStorage.getItem("user"));

	/**
	 * Carrrega sempre que o provider é chamado
	 */
	useEffect(() => {
		if (
			localStorage.getItem("token") &&
			localStorage.getItem("token") !== "undefined"
		) {
			const storeToken = JSON.parse(localStorage.getItem("token"));

			Api.setToken(storeToken);

			// Verifica se token ainda é valido
			isAuth(storeToken).then((res) => {
				console.log(res.data);
				if (!res.data.auth) handleLogout();
			});
		}
	}, []);

	/**
	 * Efetua a função de logar.
	 * @param {string} userLogin
	 * @param {string} passwd
	 */
	async function handleLogin(userLogin, passwd) {
		console.log(userLogin, passwd);
		try {
			const response = await Api.Login(userLogin, passwd);
			console.log(response);
			if (response.data.success) {
				localStorage.setItem("token", JSON.stringify(response.data.token));
				localStorage.setItem("user", JSON.stringify(response.data.user));
				setUser(response.data.user);
				setToken(response.data.token);

				Api.setToken(token);
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Trata o logout
	 */
	function handleLogout() {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		Api.setToken(null);
	}

	/**
	 * Verifica se o token ainda é valido;
	 */
	async function isAuth(token) {
		if (token) return await Api.Auth();

		return false;
	}

	/**
	 * Provider
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
