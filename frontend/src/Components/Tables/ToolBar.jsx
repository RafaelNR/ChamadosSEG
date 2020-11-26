import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core";
import { AddIconButton } from "../Buttons/Icons";
import { CreatedTicket } from "../Buttons/Atividades";
import Search from "../Search";
import useSearch from "../../Context/SearchContext";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const AtividadesTableToolBar = React.memo(({ title, data }) => {
  const classes = useToolbarStyles();
  const { handleChangeSearch } = useSearch();

  const handleTickeSearch = (e) => {};

  return (
    <Toolbar className={classes.root}>
      <React.Fragment>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="span"
        >
          {title}
        </Typography>
      </React.Fragment>
      <Search handleChangeSearch={handleChangeSearch} />
      <CreatedTicket />
    </Toolbar>
  );
});

const TableToolbar = React.memo(({ title, data }) => {
  const classes = useToolbarStyles();
  const { handleChangeSearch } = useSearch();

  return (
    <Toolbar className={classes.root}>
      <React.Fragment>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="span"
        >
          {title}
        </Typography>
      </React.Fragment>
      <Search handleChangeSearch={handleChangeSearch} />
      {data ? <AddIconButton /> : null}
    </Toolbar>
  );
});

export { AtividadesTableToolBar };

export default TableToolbar;

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

AtividadesTableToolBar.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
