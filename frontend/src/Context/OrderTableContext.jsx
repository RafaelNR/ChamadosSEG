import React, { createContext, useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";

const OrderTableContext = createContext({});

const OrderTableProvider = ({ children }) => {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("");

	const handleRequestSort = useCallback(
		(property) => {
			const isAsc = orderBy === property && order === "asc";
			setOrder(isAsc ? "desc" : "asc");
			setOrderBy(property);
		},
		[order, orderBy]
	);

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

export default function useOrderTable() {
	return useContext(OrderTableContext);
}

export { OrderTableContext, OrderTableProvider };
