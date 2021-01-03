import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core/";
import { Edit, VisibilitySharp, AddBoxSharp, SaveSharp } from "@material-ui/icons/";
import Progress from "./Progress";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '20px',
    color: theme.palette.button.create
  },
  edit: {
    color: theme.palette.text.icon,
  },
  save: {
    color: theme.palette.text.icon
  }
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
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.edit}
      color="primary"
      onClick={(event) => handleEdit(event)}
    >
      <Edit />
    </Button>
  );
});


const SaveInfo = React.memo(({ handleSubmit, loading, success }) => {
  const classes = useStyles();
  return (
    <Progress
      handleSubmit={handleSubmit}
      loading={loading}
      success={success}
    >
      <SaveSharp className={classes.save} />
    </Progress>
  );
});

export { View, CreatedTicket, EditTicket, EditInfoAtividade, SaveInfo };
