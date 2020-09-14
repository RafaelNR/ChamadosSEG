import React, { createContext, useState, useEffect } from "react";
import * as Service from "../Services/Auth";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	/**
	 * Carrrega sempre que o provider é chamado
	 */
	useEffect(() => {
		if (
			localStorage.getItem("token") &&
			localStorage.getItem("token") !== "undefined"
		) {
			const storeUser = JSON.parse(localStorage.getItem("user"));
			const storeToken = JSON.parse(localStorage.getItem("token"));

			Service.setToken(storeToken);

			// Verifica se token ainda é valido
			isAuth(storeToken).then((res) => {
				console.log(res.data);
				if (!res.data.auth) handleLogout();
			});

			setUser(storeUser);
			setToken(storeToken);
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
			const response = await Service.Login(userLogin, passwd);
			console.log(response);
			if (response.data.success) {
				localStorage.setItem("token", JSON.stringify(response.data.token));
				localStorage.setItem("user", JSON.stringify(response.data.user));
				setUser(response.data.user);
				setToken(response.data.token);

				Service.setToken(token);
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
		Service.setToken(null);
	}

	/**
	 * Verifica se o token ainda é valido;
	 */
	async function isAuth(token) {
		if (token) return await Service.Auth();

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

export { AuthContext, AuthProvider };
