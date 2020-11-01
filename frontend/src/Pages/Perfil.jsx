import React from 'react';
import { makeStyles, Typography, Paper } from '@material-ui/core'
import { LoadingProvider } from "../Context/LoadingContext";

const Test = () => {
  return (<Typography>Perfil</Typography>);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: "-6rem",
	},
}));


export default () => {
  const classes = useStyles();
  
  return (
    <LoadingProvider>
      <Paper className={classes.root}>
        <div className={classes.head}>
        </div>
      </Paper>
		</LoadingProvider>
  )
}