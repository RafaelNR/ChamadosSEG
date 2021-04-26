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
import Toolbar from "../../Components/Tables/ToolBar";
import TablePagination from "../../Components/Tables/TablePagination";
import Actions from "../../Components/Tables/Actions";
import CircularProcess from "../../Components/Loading";

//* CONTEXT
import useSubCategorias from "../../Context/SubCategoriasContext";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

//& UTILS
import sortObject from "../../Utils/sortObject";

const headCells = [
  {
    id: "nome",
    numeric: false,
    disablePadding: false,
    label: "Sub-Categoria",
    sort: true,
  },
  {
    id: "user",
    numeric: false,
    disablePadding: false,
    label: "Última Alteração",
    sort: false,
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
    overflow: "hidden",
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
  rowchip: {
    width: "25%",
  },
  chip: {
    margin: 2,
  },
}));

export default function () {
  const classes = useStyles();
  const { subcategorias, getSubCategoria } = useSubCategorias();
  const { search, searchResults, setSearchResults } = useSearch();
  const { order, orderBy, setOrderBy } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

  /**
   ** Ordem os dados e seta as linha a serem exibidas
   */
  useEffect(() => {
    setOrderBy("nome");
    setRows(search && search.length > 3 ? searchResults : subcategorias);
  }, [subcategorias, searchResults, search, setOrderBy, setRows]);

  /**
   ** Seta os usuários encontrados na pesquisa.
   */
  useEffect(() => {
    if (subcategorias) {
      const results = subcategorias.filter((sub) => {
        const nome = sub.nome.toLowerCase();
        return nome.includes(search.toLowerCase()) ? sub : null
      });
      return setSearchResults(results);
    }
    return setSearchResults([]);
  }, [search, setSearchResults, subcategorias]);

  return (
    <React.Fragment>
      <Toolbar
        title="Lista de SubCategorias"
        data={subcategorias && subcategorias.length > 0 ? true : false}
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
            {!subcategorias || subcategorias.length === 0 ? (
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
                        <strong>{row.nome}</strong>
                      </TableCell>
                      <TableCell align="left" className={classes.tablerow}>
                        {row.user}
                      </TableCell>
                      <TableCell align="center" className={classes.tablerow}>
                        <Actions
                          id={row.id}
                          getID={getSubCategoria}
                          disabled={row.actived}
                          buttons={["edit", "delete"]}
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
