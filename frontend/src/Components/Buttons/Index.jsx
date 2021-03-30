import React, { memo } from "react";
import PropTypes from 'prop-types';
import { makeStyles, Button, DialogActions } from '@material-ui/core/';
import {
  Add,
  Save,
  Close,
  NavigateNextSharp,
  NavigateBeforeSharp,
} from '@material-ui/icons/';
import useDialog from '../../Context/DialogContext';

const useStyles = makeStyles((theme) => ({
  new: {
    backgroundColor: theme.palette.button.new,
    color: 'white',
    padding: '5px 30px',
    marginRight: '8px',
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.new
    }
  },
  cancel: {
    backgroundColor: 'transparent',
    color: '#b71c1c',
    padding: '8px 15px',
    border: '1px solid #b71c1c',
    '&:hover': {
      transition: '',
      color: 'white',
      backgroundColor: '#b71c1c'
    }
  },
  save: {
    backgroundColor: theme.palette.button.success,
    color: 'white',
    padding: '8px 15px',
    marginRight: '8px',
    '&:hover': {
      transition: '',
      backgroundColor: '#124116'
    }
  },
  next: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '8px 15px',
    marginRight: '8px',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
}));


const NewButton = memo(({ name }) => {
  const classes = useStyles();
  const { openDialog } = useDialog();
  return (
    <Button
      onClick={() => openDialog('insert')}
      type="submit"
      className={classes.new}
      startIcon={<Add className={classes.icon} />}
    >
      {name}
    </Button>
  );
});

const SaveButton = memo(({ disabled, name="SALVAR" }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      className={classes.save}
      startIcon={<Save className={classes.icon} />}
      disabled={disabled}
    >
      {name}
    </Button>
  );
});

const NavigatorButton = memo(({ clickAction, icon, }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={() => clickAction(icon)}
      startIcon={
        icon === 'next' ? (
          <NavigateNextSharp className={classes.icon} />
        ) : (
          <NavigateBeforeSharp className={classes.icon} />
        )
      }
      className={classes.next}
    >
      {icon === 'next' ? 'Proxímo' : 'Anterior'}
    </Button>
  );
});

const CancelButton = memo(({ clickClose, name="CANCELAR" }) => {
  const classes = useStyles();
  return (
    <DialogActions>
      <Button
        className={classes.cancel}
        startIcon={<Close className={classes.icon} />}
        onClick={clickClose}
      >
        {name}
      </Button>
    </DialogActions>
  );
});

export { NewButton, SaveButton, CancelButton, NavigatorButton};
