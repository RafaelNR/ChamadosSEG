import React from "react";
import clsx from "clsx";
import { CircularProgress, makeStyles, Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: theme.palette.button.success,
    '&:hover': {
      backgroundColor: green[900]
    },
    '&:disabled': {
      backgroundColor: '#123F15',
      color: theme.palette.text.icon
    }
  },
  buttonProgress: {
    color: theme.palette.button.success,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  buttonNone: {
    opacity: 0
  }
}));

export default ({ children, handleSubmit, loading, success }) => {
  const classes = useStyles();
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success && !loading,
    [classes.buttonNone]: success && loading
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, [timer.current]);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading || success}
          onClick={handleSubmit}
        >
          { success && !loading ? <CheckIcon /> : children}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};


export const ProgressSubmit = ({ children, loading, success }) => {
  const classes = useStyles();
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success && !loading,
    [classes.buttonNone]: success && loading
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, [timer.current]);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper} style={{ width: '100%' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading || success}
          style={{ width: '100%' }}
        >
          {success && !loading ? <CheckIcon /> : children}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};