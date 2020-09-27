import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
} from "@material-ui/core/";
import EnhancedTableHead from "./TableHead";
import EnhancedTableToolbar from "./ToolBar";
import Actions from "./Actions";
import sortObject from "../../Utils/sortObject";

import { UsuariosContext } from "../../Context/UsuariosContext";
import { OrderTableContext } from "../../Context/OrderTableContext";
import { SearchContext } from "../../Context/SearchContext";

// Header Table
const headCells = [
	{
		id: "nome",
		numeric: false,
		disablePadding: false,
		label: "Nome Completo",
		sort: true,
	},
	{
		id: "user",
		numeric: false,
		disablePadding: false,
		label: "Login",
		sort: true,
	},
	{
		id: "email",
		numeric: false,
		disablePadding: false,
		label: "Email",
		sort: true,
	},
	{
		id: "actions",
		numeric: false,
		disablePadding: false,
		label: "Ações",
		sort: false,
	},
];

// Tabela
const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
	loading: {
		display: "flex",
		justifyContent: "center",
	},
	tablerow: {
		padding: "10px 15px",
	},
}));

export default function EnhancedTable() {
	const classes = useStyles();
	const { usuarios, getUsuario } = useContext(UsuariosContext);
	const { search, searchResults, setSearchResults } = useContext(SearchContext);
	const { order, orderBy } = useContext(OrderTableContext);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	/**
	 * Renderiza a pesquisa
	 */
	useEffect(() => {
		const results = usuarios.filter((usuario) => {
			const nome = usuario.nome.toLowerCase();
			const user = usuario.user.toLowerCase();

			if (
				nome.includes(search.toLowerCase()) ||
				user.includes(search.toLowerCase())
			) {
				return usuario;
			}
		});
		setSearchResults(results);
	}, [search, setSearchResults]); // eslint-disable-next-line

	/**
	 * Click nas actions da tabela.
	 */
	const clickAction = (id) => {
		getUsuario(id);
	};

	/**
	 * Seta nova página
	 */
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const rows = search && search.length > 3 ? searchResults : usuarios;
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<React.Fragment>
			<EnhancedTableToolbar title="Lista de usuários" />
			<TableContainer>
				<Table
					className={classes.table}
					aria-labelledby="tableTitle"
					size="medium"
					aria-label="enhanced table"
				>
					<EnhancedTableHead headCells={headCells} />
					<TableBody>
						{sortObject(rows, order, orderBy, page, rowsPerPage).map(
							(row, index) => {
								return (
									<TableRow hover tabIndex={-1} key={row.nome}>
										<TableCell
											component="th"
											className={classes.tablerow}
											scope="row"
											padding="default"
										>
											{row.nome}
										</TableCell>
										<TableCell align="left" className={classes.tablerow}>
											{row.user}
										</TableCell>
										<TableCell align="left" className={classes.tablerow}>
											{row.email}
										</TableCell>
										<TableCell align="center" className={classes.tablerow}>
											<Actions
												id={row.id}
												clickAction={clickAction}
												disabled={row.actived}
											/>
										</TableCell>
									</TableRow>
								);
							}
						)}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				labelRowsPerPage="Linhas por página:"
				rowsPerPageOptions={[10, 15, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</React.Fragment>
	);
}
