import React,{ memo } from 'react'
import { DialogActions, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px 15px'
  }
}));
export default memo(({children}) => {
  const classes = useStyles();
  return (
    <DialogActions className={classes.root}>
      { children }
    </DialogActions>
  );
})
