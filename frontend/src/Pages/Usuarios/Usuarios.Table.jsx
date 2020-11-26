import React, { useEffect } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
} from "@material-ui/core/";

//* COMPONENTES
import EnhancedTableHead from "../../Components/Tables/TableHead";
import EnhancedTableToolbar from "../../Components/Tables/ToolBar";
import TablePagination from "../../Components/Tables/TablePagination";
import Actions from "../../Components/Tables/Actions";
import sortObject from "../../Utils/sortObject";
import CircularProcess from "../../Components/Loading";

//* FUNCTIONS
import { initialsName } from "../../Utils/functions";

//* CONTEXT
import useUsuarios from "../../Context/UsuariosContext";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

// Header Table
const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: false,
    label: "",
    sort: false,
  },
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

export default function () {
  const classes = useStyles();
  const { usuarios, getUsuario } = useUsuarios();
  const { search, searchResults, setSearchResults } = useSearch();
  const { order, orderBy, setOrderBy } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

  /**
   * Ordem os dados e seta as linha a serem exibidas
   */
  useEffect(() => {
    setOrderBy("nome");
    setRows(search && search.length > 3 ? searchResults : usuarios);
  }, [usuarios, searchResults, search, setOrderBy, setRows]);

  /**
   * Seta os usuários encontrados na pesquisa.
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
      return;
    });
    setSearchResults(results);
    return;
  }, [search, setSearchResults, usuarios]);

  return (
    <React.Fragment>
      <EnhancedTableToolbar
        title="Lista de usuários"
        data={usuarios && usuarios.length > 0 ? true : false}
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
            {!usuarios || usuarios.length === 0 ? (
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
                        <Avatar alt={row.nome} className={classes.orange}>
                          {initialsName(row.nome)}
                        </Avatar>
                      </TableCell>
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
                          getID={getUsuario}
                          disabled={row.actived}
                          buttons={["edit", "disable"]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            )}
            {usuarios && usuarios.length > 0 && emptyRows > 0 && (
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
