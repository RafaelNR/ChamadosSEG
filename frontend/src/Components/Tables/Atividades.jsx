import React, { useEffect } from "react";
import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@material-ui/core/";

//* COMPONENTES
import { AtividadesTableToolBar as Toolbar } from "./ToolBar";
import TableHead from "./TableHead";
import TablePagination from "./TablePagination";
import Actions from "./Actions";
import sortObject from "../../Utils/sortObject";
import CircularProcess from "../Loading";

//* CONTEXT
import useAtividades from "../../Context/AtividadesContext";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

//* UTILS
import { handleDate } from '../../Utils/dates';

// Header Table
const headCells = [
	{
		id: "ticket",
		numeric: false,
		disablePadding: false,
		label: "# Ticket",
		sort: false,
	},
	{
		id: "date",
		numeric: false,
		disablePadding: false,
		label: "Data",
		sort: true,
	},
  {
		id: "técnico",
		numeric: false,
		disablePadding: false,
		label: "Aberto Por",
		sort: true,
	},
	{
		id: "cliente",
		numeric: false,
		disablePadding: false,
		label: "Cliente",
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

export default () => {
  const classes = useStyles();
	const { atividades } = useAtividades();
	const { search, searchResults, setSearchResults } = useSearch();
	const { order, orderBy, setOrderBy,setOrder } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

	//& Order e por onde será renderizado as atividades.
	useEffect(() => {
		setOrderBy("date");
		setOrder('desc');
		setRows(search && search.length > 3 ? searchResults : atividades);
	}, [atividades, searchResults,search, setOrderBy, setRows]);

	//& Renderiza a pesquisa;
	useEffect(() => {
		if (search) {
			const results = atividades.filter((atv) => {
				const técnico = atv['técnico'].toLowerCase();
				const cliente = atv.cliente.toLowerCase();

				if (
					técnico.includes(search.toLowerCase()) ||
					cliente.includes(search.toLowerCase())
				) {
					return atv;
				}
				return;
			});
			return setSearchResults(results);
		}
		return setSearchResults(atividades);
	}, [search, setSearchResults, atividades]);
  
	return (
		<React.Fragment>
			<Toolbar
				title="Lista de Atividades"
				data={atividades && atividades.length > 0 ? true : false}
			 />
			<TableContainer>
				<Table
					className={classes.table}
					aria-labelledby="tableTitle"
					size="medium"
					aria-label="enhanced table"
				>
					<TableHead headCells={headCells} />
					<TableBody>
						{!atividades || atividades.length === 0
							? (<CircularProcess type="Table" />)
							: (sortObject(rows, order, orderBy, page, rowsPerPage).map(
								(row, index) => {
									return (
										<TableRow hover tabIndex={-1} key={row.id}>
											<TableCell
												component="th"
												className={classes.tablerow}
												scope="row"
												padding="default"
											>
                      {row.ticket}
                      </TableCell>
											<TableCell align="left" className={classes.tablerow}>
												{handleDate(row.date)}
											</TableCell>				
											<TableCell align="left" className={classes.tablerow}>
												{row.técnico}
											</TableCell>
											<TableCell align="left" className={classes.tablerow}>
												{row.cliente}
											</TableCell>
										</TableRow>
									);
								}
							))
						}
						{atividades && atividades.length > 0  && emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination />
		</React.Fragment>
	);
};