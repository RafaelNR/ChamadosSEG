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
import Actions from "../../Components/Tables/NewActions";
import sortObject from "../../Utils/sortObject";
import CircularProcess from "../../Components/Loading";

//* CONTEXT
import useModelos from "../../Context/ModelosChamadoContext";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

// Header Table
const headCells = [
  {
    id: "titulo",
    numeric: false,
    disablePadding: false,
    label: "Titulo",
    sort: false,
  },
  {
    id: "categoria",
    numeric: false,
    disablePadding: false,
    label: "Categorias",
    sort: true,
  },
  {
    id: "sub_categorias",
    numeric: false,
    disablePadding: false,
    label: "Sub Categorias",
    sort: true,
  },
  {
    id: "user",
    numeric: false,
    disablePadding: false,
    label: "Usuários",
    sort: true,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Ações",
    sort: false,
    align: 'center',
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
  image: {
    width: 40,
    height: 40,
    backgroundColor: '#999',
    borderRadius: '50%',
    objectFit: 'contain'
  }
}));

export default function () {
  const classes = useStyles();
  const { modelos, setModelo } = useModelos();
  const { search, searchResults, handleSearch } = useSearch();
  const { order, orderBy, setOrderBy } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();


  useEffect(() => {
    if (modelos) {
      setOrderBy('titulo');
      return setRows(search && search.length > 3 ? searchResults : modelos);
    }
  }, [modelos]);

  useEffect(() => {
    if (modelos) {
      handleSearch(['titulo'], modelos);
    }
    // eslint-disable-next-line
  }, [search]);
  
  return (
    <React.Fragment>
      <EnhancedTableToolbar
        title="Lista Modelos de Chamados"
        data={modelos && modelos.length > 0 ? true : false}
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
            {!modelos || modelos.length === 0 ? (
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
                        {row.titulo}
                      </TableCell>
                      <TableCell
                        component="th"
                        className={classes.tablerow}
                        scope="row"
                        padding="default"
                      >
                        {row.categoria}
                      </TableCell>
                      <TableCell align="left" className={classes.tablerow}>
                        {row.sub_categoria}
                      </TableCell>
                      <TableCell align="left" className={classes.tablerow}>
                        {row.user}
                      </TableCell>
                      <TableCell align="center" className={classes.tablerow}>
                        <Actions
                          id={row.id}
                          setCurrent={setModelo}
                          buttons={['edit', 'delete']}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            )}
            {modelos && modelos.length > 0 && emptyRows > 0 && (
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
