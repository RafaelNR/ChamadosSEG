import React, { useContext, useState, useEffect } from "react";
import * as Service from "../Services/Auth";

const HomeContext = createContext({});

const HomeProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	/**
	 * Carrrega sempre que o provider é chamado
	 */
	useEffect(() => {}, []);

	/**
	 * Provider
	 */
	return <HomeContext.Provider value={{}}>{children}</HomeContext.Provider>;
};

export { HomeContext, HomeProvider };
