import React, { useEffect } from "react";
import clsx from 'clsx'
//* COMPONENTES
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core/";
import { AtividadesTableToolBar as Toolbar } from "../../Components/Tables/ToolBar";
import TableHead from "../../Components/Tables/TableHead";
import TablePagination from "../../Components/Tables/TablePagination";
import sortObject from "../../Utils/sortObject";
import CircularProcess from "../../Components/Loading";
import {
  EditTicket,
  ViewTicket,
  PdfTicket
} from '../../Components/Buttons/Atividades';

//* CONTEXT
import useAtividades from "../../Context/AtividadesContext";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

//* UTILS
import {
  handleDate,
  permissionEditAtividade,
  getStatusAtividade
} from '../../Utils/dates';

const headCells = [
  {
    id: 'ticket',
    numeric: false,
    disablePadding: false,
    label: '# Ticket',
    sort: true
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Data',
    sort: true
  },
  {
    id: 'técnico',
    numeric: false,
    disablePadding: false,
    label: 'Aberto Por',
    sort: true
  },
  {
    id: 'cliente',
    numeric: false,
    disablePadding: false,
    label: 'Cliente',
    sort: true
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Ações',
    sort: false,
    align: 'center'
  }
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  loading: {
    display: 'flex',
    justifyContent: 'center'
  },
  tablerow: {
    padding: '10px 15px'
  },
  ticket: {
    width: 10,
    height: 10,
    borderRadius: 50,
    overflow: 'hidden',
    // background: 'green',
    border: '1px solid #f9f9f9',
    float: 'left',
    marginTop: 5,
    marginRight: 10
  }
}));

export default () => {
  const classes = useStyles();
  const { atividades,loading,downloadPDF,loadingPDF } = useAtividades();
  const { search, searchResults, setSearchResults } = useSearch();
  const { order, orderBy, setOrderBy, setOrder } = useOrderTable();
  const {
    page,
    rows,
    setRows,
    rowsPerPage,
    emptyRows,
    setRowsPerPage
  } = usePageTable();

  //& Order e por onde será renderizado as atividades.
  useEffect(() => {
    setRowsPerPage(25);
    setOrderBy("");
    setOrder("desc");
    setRows(search && search.length > 3 ? searchResults : atividades);
  }, [atividades, searchResults, search, setOrderBy, setRows, setOrder]);

  //& Renderiza a pesquisa;
  useEffect(() => {
    if (search) {
      const results = atividades.filter((atv) => {
        const técnico = atv["técnico"].toLowerCase();
        const cliente = atv.cliente.toLowerCase();

        if (
          técnico.includes(search.toLowerCase()) ||
          cliente.includes(search.toLowerCase())
        ) {
          return atv;
        }
        return false;
      });
      return setSearchResults(results);
    }
    return setSearchResults(atividades);
  }, [search, setSearchResults, atividades]);

  return (
    <React.Fragment>
      <Toolbar title="Lista de Atividades"/>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <TableHead headCells={headCells} />
          <TableBody>
            { loading ? (
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
                        <div
                          className={classes.ticket}
                          style={{
                            backgroundColor: getStatusAtividade(row.date)
                          }}
                        ></div>
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
                      <TableCell align="center" className={classes.tablerow}>
                        <ViewTicket ticket={row.ticket} />
                        {permissionEditAtividade(row.date) ? (
                          <>
                            <EditTicket ticket={row.ticket} />
                          </>
                        ) : (
                          <>
                            <PdfTicket
                              ticket={row.ticket}
                              handleClick={downloadPDF}
                              loading={loadingPDF}
                            />
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            )}
            {atividades && atividades.length > 0 && emptyRows > 0 && (
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
