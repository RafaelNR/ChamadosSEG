import React from "react";
import {
  Link,
} from "react-router-dom";
import {
  Paper,
  makeStyles
} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  paper: {
    height: 125,
    width: '95%',
    margin: '0 auto',
    position: 'relative',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    flexFlow: 'column',
    background: theme.palette.background.boxhome,
    boxShadow: 'none',
    '&:hover': {
      filter: 'brightness(0.7)',
      border: '1px solid ' + theme.palette.background.boxhome
    }
  },
  icon: {
    position: 'absolute',
    top: 40,
    right: 0,
    fontSize: 85,
    opacity: theme.darkMode ? 0.4 : 0.6
  }
}));

export default React.memo((props) => {
  const classes = useStyles();
  const colorIcon = props.color;

  return (
    <Link to={props.to}>
      <Paper className={classes.paper}>
        <>
          <span style={{ fontSize: 30 }}>{ props.value >= 0 ? props.value : <CircularProgress />}</span>
          {props.text && <span>{props.text}</span>}
          <props.Icon className={classes.icon} style={{ color: colorIcon }} />
        </>
      </Paper>
    </Link>
  );
});
  