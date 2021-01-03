import React from "react";
import { makeStyles, Button, DialogActions } from "@material-ui/core/";
import {
  Save,
  Close,
  NavigateNextSharp,
  NavigateBeforeSharp,
} from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  cancel: {
    backgroundColor: 'transparent',
    color: '#b71c1c',
    padding: '8px 15px',
    border: '1px solid #b71c1c',
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  icon: {
    fontSize: '20px'
  }
}));

const SaveButton = React.memo(({ disabled }) => {
  const classes = useStyles();
  return (
    <Button type="submit" className={classes.save} disabled={disabled}>
      <Save className={classes.icon} />
    </Button>
  );
});

const NavigatorButton = React.memo(({ clickAction, name, icon }) => {
  const classes = useStyles();
  return (
    <Button onClick={() => clickAction()} className={classes.next}>
      {icon === "next" ? (
        <NavigateNextSharp className={classes.icon} />
      ) : (
        <NavigateBeforeSharp className={classes.icon} />
      )}
      {name ? name : ""}
    </Button>
  );
});

const CancelButton = React.memo(({ clickClose }) => {
  const classes = useStyles();
  return (
    <DialogActions>
      <Button className={classes.cancel} onClick={clickClose}>
        <Close className={classes.icon} />
      </Button>
    </DialogActions>
  );
});

export { SaveButton, CancelButton, NavigatorButton };
