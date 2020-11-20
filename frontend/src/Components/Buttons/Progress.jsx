import React from 'react';
import clsx from 'clsx';
import { CircularProgress , makeStyles, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    '&:disabled': {
      backgroundColor: green[700],
      color: 'white'
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default ({ children, handleSubmit, loading, success}) => {
  const classes = useStyles();
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

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
          { success ? <CheckIcon /> : children }
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
