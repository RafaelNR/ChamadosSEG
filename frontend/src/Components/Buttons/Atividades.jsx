import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { makeStyles, IconButton, Tooltip, Button } from '@material-ui/core/';
import { Edit, VisibilitySharp, Add, SaveSharp, PictureAsPdfSharp } from "@material-ui/icons/";
import Progress from "./Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '8px',
    color: 'white',
    '& .MuiButton-startIcon': {
      marginRight: 0
    }
  },
  new: {
    padding: '7.5px 0',
    backgroundColor: theme.palette.button.new,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.new
    }
  },
  edit: {
    padding: '5px 0',
    minWidth: 50,
    height: 30,
    backgroundColor: theme.palette.button.edit,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.edit
    }
  },
  view: {
    padding: '5px 0',
    marginRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minWidth: 50,
    height: 30,
    backgroundColor: theme.palette.button.view,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.view
    }
  },
  pdf: {
    padding: '5px 0',
    marginRight: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    minWidth: 50,
    height: 30,
    backgroundColor: theme.palette.button.pdf,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.pdf
    }
  }
}));

const ViewTicket = React.memo(({ ticket }) => {
  const classes = useStyles();
  return (
    <NavLink to={`/atividades/view/${ticket}`}>
      <Tooltip title="Visualizar">
        <Button
          className={clsx(classes.root, classes.view)}
          startIcon={<VisibilitySharp style={{ fontSize: 15 }} />}
        />
      </Tooltip>
    </NavLink>
  );
});

const PdfTicket = React.memo(({ ticket }) => {
  const classes = useStyles();
  return (
    <NavLink to={`/atividades/view/${ticket}`}>
      <Tooltip title="Pdf">
        <Button
          className={clsx(classes.root, classes.pdf)}
          startIcon={<PictureAsPdfSharp style={{ fontSize: 15 }} />}
        />
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
          className={clsx(classes.root, classes.new)}
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
        <Button
          className={clsx(classes.root, classes.edit)}
          startIcon={<Edit style={{fontSize: 15}} />}
        />
      </Tooltip>
    </NavLink>
  );
});

const EditInfo = React.memo(({ handleEdit }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.editInfo}
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
      <SaveSharp className={classes.saveInfo} />
    </Progress>
  );
});

export { ViewTicket, PdfTicket, CreatedTicket, EditTicket, EditInfo, SaveInfo };
