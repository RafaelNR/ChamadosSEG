import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-6rem",
  },
}));

export default React.memo((props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper>
        { props.children }
      </Paper>
    </div>
  );
});
