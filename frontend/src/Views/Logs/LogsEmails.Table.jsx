import React, { useEffect } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@material-ui/core/"
import UpdateIcon from '@material-ui/icons/Update';

//* COMPONENTES
import EnhancedTableHead from "../../Components/Tables/TableHead";
import EnhancedTableToolbar from "../../Components/Tables/ToolBar";
import TablePagination from "../../Components/Tables/TablePagination";
import sortObject from "../../Utils/sortObject";
import CircularProcess from "../../Components/Loading";
import { OpenPDF, ConfirmResendEmail } from '../../Components/Buttons/LogsEmails'

//* CONTEXT
import useLogs from "../../Context/Log.Context";
import useOrderTable from "../../Context/OrderTableContext";
import usePageTable from "../../Context/PageTableContext";
import useSearch from "../../Context/SearchContext";

//* UTILS
import { handleDateTimeFull, converterFileInData } from '../../Utils/dates';

// Header Table
const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: '#',
    sort: false
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Enviado',
    sort: false
  },
  {
    id: 'subject',
    numeric: false,
    disablePadding: false,
    label: 'Assunto',
    sort: false
  },
  {
    id: 'to',
    numeric: false,
    disablePadding: false,
    label: 'Destinatário',
    sort: false
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    sort: false
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
    padding: '10px 5px'
  },
  success: {
    backgroundColor: '#d8f3dc',
    color: '#2b9348',
    padding: '3px 30px',
    borderRadius: '35px',
    fontWeight: 'bold'
  },
  error: {
    backgroundColor: '#ffadad',
    color: '#d00000',
    padding: '3px 44px',
    borderRadius: '35px',
    fontWeight: 'bold'
  },
  mes_ano: {
    fontSize: 12,
    textTransform: 'capitalize',
    display: 'block'
  },
  date: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon:{
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 4
  },
}));

const RowUpdateCreated = ({createdAt,updatedAt}) => {
  const classes = useStyles();
  return (
    <span className={classes.date}>
      {updatedAt !== createdAt && (
        <Tooltip title="Email Reenviado">
          <UpdateIcon className={classes.icon}/>
        </Tooltip>
      )}
    </span>
  );
}

export default function () {
  const classes = useStyles();
  const { logs } = useLogs();
  const { search, searchResults, handleSearch } = useSearch();
  const { order, orderBy, setOrderBy, setOrder } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

  // eslint-disable-next-line
  useEffect(() => {
    if (logs) {
      setOrderBy('id');
      setOrder('desc');
      setRows(search && search.length > 3 ? searchResults : logs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs, searchResults]);

  useEffect(() => {
    if (logs) {
      handleSearch(['type', 'to', 'filename'], logs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <React.Fragment>
      <EnhancedTableToolbar title="Envio Emails" data={false} />
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
                      <RowUpdateCreated
                        updatedAt={row.updated_at}
                        createdAt={row.created_at}
                      />
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {row.createdAt >= row.updatedAt
                        ? handleDateTimeFull(row.createdAt)
                        : handleDateTimeFull(row.updatedAt)}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      <span>{row.subject}</span>
                      <span className={classes.mes_ano}>
                        {converterFileInData(row.file)}
                      </span>
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {row.to}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {row.status === 'success' ? (
                        <span className={classes.success}>Sucesso</span>
                      ) : (
                        <span className={classes.error}>Error</span>
                      )}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {row.file && (
                        <>
                          <ConfirmResendEmail id={row.id} />
                          <OpenPDF file={row.file} />
                        </>
                      )}
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

