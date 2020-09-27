import React, { createContext, useContext, useState, useEffect } from "react";
import * as Api from "../Api/Crud";

const ClientesContext = createContext({});

const ClientesProvider = ({ children }) => {
	const [clientes, setClientes] = useState([]);
	const [cliente, setCliente] = useState({});
	const [loading, setLoading] = useState(true);

	/**
	 * Inicia os clients
	 */
	useEffect(() => {
		async () => {
			try {
				const Clientes = await Api.get("clientes");
			} catch (error) {
				console.log(error);
			}
		};
	});

	return <ClientesContext.Provider>{children}</ClientesContext.Provider>;
};

export default { ClientesConsumer, ClientesProvider };
