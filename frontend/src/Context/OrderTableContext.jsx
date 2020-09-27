import React, { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const OrderTableContext = createContext({});

const OrderTableProvider = ({ children }) => {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("nome");

	/**
	 * Manipula a ordenação
	 */
	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	return (
		<OrderTableContext.Provider
			value={{
				order,
				setOrder,
				orderBy,
				setOrderBy,
				handleRequestSort,
			}}
		>
			{children}
		</OrderTableContext.Provider>
	);
};

OrderTableProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { OrderTableContext, OrderTableProvider };
