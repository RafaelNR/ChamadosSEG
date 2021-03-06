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
import EnhancedTableHead from "../../Components/Tables/TableHead";
import EnhancedTableToolbar from "../../Components/Tables/ToolBar";
import TablePagination from "../../Components/Tables/TablePagination";
import Actions from "../../Components/Tables/Actions";
import CircularProcess from "../../Components/Loading";

//* CONTEXT
import useClientes from "../../Context/ClientesContext";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

//* UTILS
import sortObject from "../../Utils/sortObject";

// Header Table
const headCells = [
  {
    id: "nome_fantasia",
    numeric: false,
    disablePadding: false,
    label: "Nome Fantasia",
    sort: true,
  },
  {
    id: "cnpj_cpf",
    numeric: false,
    disablePadding: false,
    label: "CNPJ/CPF",
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

export default function () {
  const classes = useStyles();
  const { clientes, getCliente } = useClientes();
  const { search, searchResults, handleSearch } = useSearch();
  const { order, orderBy, setOrderBy } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

  /**
   * Ordem os dados e seta as linha a serem exibidas
   */
  useEffect(() => {
    setOrderBy('nome_fantasia');
    setRows(search && search.length > 3 ? searchResults : clientes);
    // eslint-disable-next-line
  }, [clientes, searchResults]);

  /**
   * Seta os usuários encontrados na pesquisa.
   */

  useEffect(() => {
    if (clientes) {
      handleSearch(['nome_fantasia'], clientes);
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <React.Fragment>
      <EnhancedTableToolbar
        title="Lista de Clientes"
        data={clientes && clientes.length > 0 ? true : false}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead headCells={headCells} />
          <TableBody>
            {!clientes || clientes.length === 0 ? (
              <CircularProcess type="Table" />
            ) : (
              sortObject(rows, order, orderBy, page, rowsPerPage).map(
                (row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell
                        component="th"
                        className={classes.tablerow}
                        scope="row"
                        padding="default"
                      >
                        {row.nome_fantasia}
                      </TableCell>
                      <TableCell align="left" className={classes.tablerow}>
                        {row.cnpj_cpf}
                      </TableCell>
                      <TableCell align="left" className={classes.tablerow}>
                        {row.email}
                      </TableCell>
                      <TableCell align="center" className={classes.tablerow}>
                        <Actions
                          id={row.id}
                          getID={getCliente}
                          disabled={row.actived}
                          buttons={["edit", "disable"]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            )}
            {emptyRows > 0 && (
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
}
