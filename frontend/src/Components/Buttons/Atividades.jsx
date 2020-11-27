import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core/";
import { Edit, VisibilitySharp, AddBoxSharp } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "20px",
  },
}));

const View = React.memo(({ ticket }) => {
  const classes = useStyles();
  return (
    <NavLink to={`/atividades/view/${ticket}`}>
      <Button
        color="primary"
        startIcon={<VisibilitySharp className={classes.icon} />}
      />
    </NavLink>
  );
});

const CreatedTicket = React.memo(() => {
  const classes = useStyles();
  return (
    <NavLink to="/atividades/create">
      <Button
        color="primary"
        startIcon={<AddBoxSharp className={classes.icon} />}
      />
    </NavLink>
  );
});

const EditTicket = React.memo(({ ticket }) => {
  const classes = useStyles();
  return (
    <NavLink to={`/atividades/edit/${ticket}`}>
      <Button color="primary" startIcon={<Edit className={classes.icon} />} />
    </NavLink>
  );
});

const EditInfoAtividade = React.memo(({ handleEdit }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={(event) => handleEdit(event)}
    >
      <Edit />
    </Button>
  );
});

export { View, CreatedTicket, EditTicket, EditInfoAtividade };
