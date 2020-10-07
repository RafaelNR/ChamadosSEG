import React, { createContext, useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";

const PageTableContext = createContext({});

const PageTableProvider = ({ children }) => {
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	/**
	 * Muda para uma nova página
	 */
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	/*
	/* Altera a quantidade de itens por página
	 */
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<PageTableContext.Provider
			value={{
				rows,
				setRows,
				emptyRows,
				page,
				setPage,
				rowsPerPage,
				setRowsPerPage,
				handleChangePage,
				handleChangeRowsPerPage
			}}
		>
			{children}
		</PageTableContext.Provider>
	);
};

PageTableProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function usePageTable() {
	return useContext(PageTableContext);
}

export { PageTableContext, PageTableProvider };
