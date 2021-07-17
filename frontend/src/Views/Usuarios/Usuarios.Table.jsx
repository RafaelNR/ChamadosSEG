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
import Gravatar from '../../Components/Box/Gravatar';


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
  const { usuarios, setUsuario } = useUsuarios();
  const { search, searchResults, handleSearch } = useSearch();
  const { order, orderBy, setOrderBy } = useOrderTable();
  const { page, rows, setRows, rowsPerPage, emptyRows } = usePageTable();


  useEffect(() => {
    if (usuarios) {
      setOrderBy('nome');
      return setRows(search && search.length > 3 ? searchResults : usuarios);
    }
<<<<<<< HEAD
    // eslint-disable-next-line
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96
  }, [usuarios, searchResults]);

  useEffect(() => {
    if (usuarios) {
      handleSearch(['nome', 'user'], usuarios);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  
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
                        <Gravatar
                          imagem={row.imagem}
                          alt={row.nome}
                          className={classes.image}
                          email={row.email}
                        />
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
                          setCurrent={setUsuario}
                          buttons={[
                            'edit',
                            parseInt(row.actived) ? 'disabled' : 'actived'
                          ]}
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
