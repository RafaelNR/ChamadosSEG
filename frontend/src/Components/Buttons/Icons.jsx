import React, { createFactory, memo } from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";
import { IconButton, Tooltip, Button, makeStyles } from "@material-ui/core";
import {
  AddBox,
  EditSharp,
  VisibilityOffSharp,
  VisibilitySharp,
  DeleteForeverSharp,
} from "@material-ui/icons";
import useDialog from "../../Context/DialogContext";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: '5px 0',
    minWidth: 50,
    height: 30,
    color: 'white',
    '&:hover': {
      transition: ''
    },
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 0
    }
  },
  edit: {
    marginTop: '-0.032rem',
    backgroundColor: theme.palette.button.edit,
    borderTopRightRadius: (props) => props.borderTopRightRadius,
    borderBottomRightRadius: (props) => props.borderBottomRightRadius,
    '&:hover': {
      backgroundColor: theme.palette.button.hover.edit
    }
  },
  disabled: {
    marginTop: '0.031rem',
    backgroundColor: theme.palette.button.delete,
    borderTopLeftRadius: (props) => props.borderTopLeftRadius,
    borderBottomLeftRadius: (props) => props.borderBottomLeftRadius,
    '&:hover': {
      backgroundColor: theme.palette.button.hover.delete
    }
  },
  actived: {
    marginTop: '0.031rem',
    backgroundColor: theme.palette.button.active,
    borderTopLeftRadius: (props) => props.borderTopLeftRadius,
    borderBottomLeftRadius: (props) => props.borderBottomLeftRadius,
    '&:hover': {
      backgroundColor: theme.palette.button.hover.active
    }
  },
  icon: {
    fontSize: '20px'
  }
}));

const AddIconButton = memo(() => {
  const classes = useStyles();
  const { openDialog } = useDialog();
  return (
    <IconButton onClick={() => openDialog("insert")}>
      <Tooltip title="Novo">
        <AddBox className={classes.add} />
      </Tooltip>
    </IconButton>
  );
});

const DeleteButton = memo(({ id, getID, border = true }) => {
  const props = !border && {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  };

  const classes = useStyles(props);
  const { openDialog } = useDialog();
  return (
    <Tooltip title="Deletar">
      <Button
        className={clsx(classes.button, classes.disabled)}
        onClick={() => {
          getID(id);
          openDialog('delete');
        }}
        startIcon={<DeleteForeverSharp className={classes.icon} />}
      />
    </Tooltip>
  );
});

const EditButton = memo(({ id, getID, border = true }) => {
  const props = !border && {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  };

  const classes = useStyles(props);
  const { openDialog } = useDialog();
  return (
    <Tooltip title="Editar">
      <Button
        className={clsx(classes.button, classes.edit)}
        onClick={() => {
          getID(id);
          openDialog('update');
        }}
        startIcon={<EditSharp className={classes.icon} />}
      />
    </Tooltip>
  );
});

const DisabledButton = memo(({ id, getID, border = true  }) => {
  const props = !border && {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
      
  const classes = useStyles(props);
  const { openDialog } = useDialog();
  return (
    <Tooltip title="Desabilitar">
      <Button
        className={clsx(classes.button, classes.disabled)}
        onClick={() => {
          getID(id);
          openDialog('disabled');
        }}
        startIcon={<VisibilityOffSharp className={classes.icon} />}
      />
    </Tooltip>
  );
});

const ActivedButton = memo(({ id, getID, border = true }) => {
  const props = !border && {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  };

  const classes = useStyles(props);
  const { openDialog } = useDialog();
  return (
    <Tooltip title="Habilitar">
      <Button
        className={clsx(classes.button, classes.actived)}
        onClick={() => {
          getID(id);
          openDialog('actived');
        }}
        startIcon={<VisibilitySharp className={classes.icon} />}
      />
    </Tooltip>
  );
});

EditButton.propTypes = {
  id: PropTypes.number.isRequired,
  getID: PropTypes.func.isRequired,
  name: PropTypes.string
};

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  getID: PropTypes.func.isRequired
};

DisabledButton.propTypes = {
  id: PropTypes.number.isRequired,
  getID: PropTypes.func.isRequired
};

ActivedButton.propTypes = {
  id: PropTypes.number.isRequired,
  getID: PropTypes.func.isRequired,
};


export {
  EditButton,
  AddIconButton,
  DeleteButton,
  DisabledButton,
  ActivedButton,
};
