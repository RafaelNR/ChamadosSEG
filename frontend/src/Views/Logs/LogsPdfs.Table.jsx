import React, { useEffect } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core/';

//* COMPONENTES
import EnhancedTableHead from '../../Components/Tables/TableHead';
import EnhancedTableToolbar from '../../Components/Tables/ToolBar';
import TablePagination from '../../Components/Tables/TablePagination';
import sortObject from '../../Utils/sortObject';
import CircularProcess from '../../Components/Loading';

//* CONTEXT
import useLogs from '../../Context/Log.Context';
import useOrderTable from '../../Context/OrderTableContext';
import usePageTable from '../../Context/PageTableContext';

//* UTILS
import { handleDateTimeFull } from '../../Utils/dates';

// Header Table
const headCells = [
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
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
    id: 'user',
    numeric: false,
    disablePadding: false,
    label: 'Usuário',
    sort: false
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Ação',
    sort: false
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
  }
}));

export default function () {
  const classes = useStyles();
  const { logs, setLogs } = useLogs();
  const { order, orderBy, setOrderBy, setOrder } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();

  function handleLogs() {
    return logs.map((log) => {
      if (log.dados) {
        return {
          ...log,
          dados: JSON.parse(log.dados)
        }
      }
    });
  }

  useEffect(() => {
    if (logs) {
      // console.log(handleLogs());
      setOrderBy('id');
      setOrder('desc');
      setRows(handleLogs());
    }
    // eslint-disable-next-line
  }, [logs]);

  return (
    <React.Fragment>
      <EnhancedTableToolbar title="Acessos Usuários" data={false} />
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
                      {row.status}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      {row.nome || '-'}
                    </TableCell>
                    <TableCell align="left" className={classes.tablerow}>
                      
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
