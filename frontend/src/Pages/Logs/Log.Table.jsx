import React, { useEffect } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core/"

//* COMPONENTES
import EnhancedTableHead from "../../Components/Tables/TableHead";
import EnhancedTableToolbar from "../../Components/Tables/ToolBar";
import TablePagination from "../../Components/Tables/TablePagination";
import sortObject from "../../Utils/sortObject";
import CircularProcess from "../../Components/Loading";

//* CONTEXT
import useLogs from "../../Context/Log.Context";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

//* UTILS
import { handleDateTimeFull } from '../../Utils/dates'

//* STORE
import LogMessage from '../../Store/LogStore'

// Header Table
const headCells = [
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Registro',
    sort: false
  },
  {
    id: 'nome',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
    sort: false
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Página',
    sort: false
  },
  {
    id: '',
    numeric: false,
    disablePadding: false,
    label: 'Menssagem',
    sort: false
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
  const { logs } = useLogs();
  const { search, searchResults, setSearchResults } = useSearch();
  const { order, orderBy, setOrderBy, setOrder } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

  // eslint-disable-next-line
  useEffect(() => {
    if (logs) {
      setOrderBy('id');
      setOrder('desc');
      setRows(search && search.length > 3 ? searchResults : logs);
    }
  }, [logs, searchResults, search, setOrder, setOrderBy, setRows]);

  // eslint-disable-next-line
  useEffect(() => {
    const results =
      logs &&
      logs.filter((log) => {
        const nome = log.nome.toLowerCase();
        const type = log.type.toLowerCase();
        const category = log.category.toLowerCase();

        if (
          nome.includes(search.toLowerCase()) ||
          type.includes(search.toLowerCase()) ||
          category.includes(search.toLowerCase())
        ) {
          return log;
        }
        return;
      });
    setSearchResults(results);
    return;
  }, [search, setSearchResults, logs]);

  return (
    <React.Fragment>
      <EnhancedTableToolbar title="Log" data={false} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead headCells={headCells} />
          <TableBody>
            {!logs || logs.length === 0 ? (
              <CircularProcess type="Table" />
            ) : (
              sortObject(rows, order, orderBy, page, rowsPerPage).map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell
                      component="th"
                      className={classes.tablerow}
                      scope="row"
                      padding="default"
                    >
                      {handleDateTimeFull(row.created_at)}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {row.nome}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {row.type}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {LogMessage(row.category)}
                    </TableCell>
                  </TableRow>
                );
              })
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



