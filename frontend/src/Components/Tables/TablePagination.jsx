import React from "react";
import { TablePagination } from "@material-ui/core/";
import usePageTable from "../../Context/PageTableContext";

export default React.memo(() => {
  const {
    rows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePageTable();

  return (
    <React.Fragment>
      <TablePagination
        labelRowsPerPage="Linhas por página:"
        rowsPerPageOptions={[10, 15, 25, 50, 100]}
        component="div"
        count={rows && rows.length ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
});
