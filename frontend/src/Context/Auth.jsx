import React, { createContext, useState, useEffect } from "react";
import * as Service from "../Services/Auth";
import api from "../Services/Api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	/**
	 * Sempre quando é chamado
	 */
	useEffect(() => {
		if (localStorage.getItem("token")) {
			const storeUser = JSON.parse(localStorage.getItem("user"));
			const storeToken = JSON.parse(localStorage.getItem("token"));

			api.defaults.headers.access_token = storeToken;
			isAuth(storeToken).then((res) => {
				console.log(res);
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
		try {
			const response = await Service.Login(userLogin, passwd);

			localStorage.setItem("token", JSON.stringify(response.data.token));
			localStorage.setItem("user", JSON.stringify(response.data.user));

			setUser(response.data.user);
			setToken(response.data.token);

			api.defaults.headers.access_token = token;
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
	}

	/**
	 * Verifica se o token ainda é valido;
	 */
	async function isAuth(token) {
		if (token) return await api.get("/auth");

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
