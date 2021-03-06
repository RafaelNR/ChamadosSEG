import React, { useEffect } from "react";
import clsx from "clsx";

//* COMPONENTES
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
} from "@material-ui/core/";

import EnhancedTableHead from "../../Components/Tables/TableHead";
import Toolbar from "../../Components/Tables/ToolBar";
import TablePagination from "../../Components/Tables/TablePagination";
import Actions from "../../Components/Tables/Actions";
import CircularProcess from "../../Components/Loading";

//* CONTEXT
import useCategorias from "../../Context/CategoriasContext";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

//* UTILS
import sortObject from "../../Utils/sortObject";

const headCells = [
  {
    id: "nome",
    numeric: false,
    disablePadding: false,
    label: "Categoria",
    sort: true,
  },
  {
    id: "subCategorias",
    numeric: false,
    disablePadding: false,
    label: "Sub-Categorias",
    sort: false,
  },
  {
    id: "user",
    numeric: false,
    disablePadding: false,
    label: "Última Alteração",
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
  const { categorias, getCategoria } = useCategorias();
  const { search, searchResults, handleSearch } = useSearch();
  const { order, orderBy, setOrderBy } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

  /**
   ** Ordem os dados e seta as linha a serem exibidas
   */
  useEffect(() => {
    setOrderBy('nome');
    setRows(search && search.length > 3 ? searchResults : categorias);
    // eslint-disable-next-line
  }, [categorias, searchResults]);

  useEffect(() => {
    if (categorias) {
      handleSearch(['nome'], categorias);
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <React.Fragment>
      <Toolbar
        title="Lista de Categorias"
        data={categorias && categorias.length > 0 ? true : false}
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
            {!categorias || categorias.length === 0 ? (
              <CircularProcess type="Table" />
            ) : (
              sortObject(rows, order, orderBy, page, rowsPerPage).map(
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
                      <TableCell
                        align="left"
                        className={clsx(classes.tablerow, classes.rowchip)}
                      >
                        {row.subCategorias.map((sub, index) => {
                          return index > 3 ? null : sub ? (
                            <Chip
                              key={index}
                              label={sub.nome}
                              variant="outlined"
                              size="small"
                              className={classes.chip}
                            />
                          ) : (
                            " - "
                          );
                        })}
                      </TableCell>
                      <TableCell align="left" className={classes.tablerow}>
                        {row.user}
                      </TableCell>
                      <TableCell align="center" className={classes.tablerow}>
                        <Actions
                          id={row.id}
                          getID={getCategoria}
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
