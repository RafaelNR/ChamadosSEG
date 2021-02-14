import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, IconButton, Tooltip, Button } from '@material-ui/core/';
import { Edit, VisibilitySharp, Add, SaveSharp } from "@material-ui/icons/";
import Progress from "./Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 6
  },
  edit: {
    color: theme.palette.text.icon
  },
  save: {
    color: theme.palette.text.icon
  },
  new: {
    backgroundColor: theme.palette.button.new,
    color: 'white',
    padding: '5px 30px',
    marginRight: '8px',
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.newHover
    },
  }
}));

const View = React.memo(({ ticket }) => {
  const classes = useStyles();
  return (
    <NavLink to={`/atividades/view/${ticket}`}>
      <Tooltip title="Visualizar">
        <IconButton className={classes.root}>
          <VisibilitySharp className={classes.icon} />
        </IconButton>
      </Tooltip>
    </NavLink>
  );
});

const CreatedTicket = React.memo(() => {
  const classes = useStyles();
  return (
    <NavLink to="/atividades/create">
      <Tooltip title="Novo">
        <Button
          className={classes.new}
          startIcon={<Add />}
        />
      </Tooltip>
    </NavLink>
  );
});

const EditTicket = React.memo(({ ticket }) => {
  const classes = useStyles();
  return (
    <NavLink to={`/atividades/edit/${ticket}`}>
      <Tooltip title="Editar">
        <IconButton className={classes.root}>
          <Edit className={classes.icon} />
        </IconButton>
      </Tooltip>
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
