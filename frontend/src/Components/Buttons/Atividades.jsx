import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Tooltip,
  Button,
  CircularProgress} from '@material-ui/core/';
import { Edit, VisibilitySharp, Add, SaveSharp, PictureAsPdfSharp } from "@material-ui/icons/";
import Progress from "./Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    '& .MuiButton-startIcon': {
      marginRight: 0
    },
    '& .MuiButton-label': {
      margin: 'auto 0',
      display: 'contents'
    }
  },
  new: {
    background: theme.palette.secondary.main,
    padding: '7px 20px',
    color: 'white',
    width: 150,
    '&:hover': {
      transition: '',
      background: theme.palette.secondary.main
    }
  },
  edit: {
    padding: '5px 0',
    minWidth: 36,
    height: 36,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
    borderRight: `0.09rem solid rgba(255, 255, 255, 0.08)`,
    minWidth: 36,
    height: 36,
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
    minWidth: 36,
    height: 36,
    backgroundColor: theme.palette.button.pdf,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.pdf
    }
  },
  loading: {
    fontSize: 12,
    width: '20px !important',
    height: '20px !important'
  }
}));

const ViewTicket = React.memo(({ ticket, variant }) => {
  const classes = useStyles();
  return (
    <Link to={`/atividades/view/${ticket}`}>
      <Tooltip title="Visualizar">
        <Button
          className={clsx(classes.root, classes.view)}
          startIcon={<VisibilitySharp style={{ fontSize: 15 }} />}
        />
      </Tooltip>
    </Link>
  );
});

const PdfTicket = React.memo(({ ticket, handleClick, loading }) => {
  const classes = useStyles();
  return (
    <Tooltip title="Gerar PDF">
      <Button
        onClick={() => handleClick(ticket)}
        className={clsx(classes.root, classes.pdf)}
        startIcon={
          loading ? (
            <CircularProgress className={classes.loading} />
          ) : (
            <PictureAsPdfSharp style={{ fontSize: 15 }} />
          )
        }
        disabled={loading}
      />
    </Tooltip>
  );
});

const CreatedTicket = React.memo(() => {
  const classes = useStyles();
  return (
    <Link to="/atividades/create">
      <Tooltip title="Novo">
        <Button
          className={clsx(classes.root, classes.new)}
          startIcon={<Add size="small" />}
          variant="contained"
        >
          Nova
        </Button>
      </Tooltip>
    </Link>
  );
});

const EditTicket = React.memo(({ ticket }) => {
  const classes = useStyles();
  return (
    <Link to={`/atividades/edit/${ticket}`}>
      <Tooltip title="Editar">
        <Button
          className={clsx(classes.root, classes.edit)}
          startIcon={<Edit style={{fontSize: 15}} />}
        />
      </Tooltip>
    </Link>
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
