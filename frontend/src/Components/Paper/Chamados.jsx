import React from 'react';
import clsx from 'clsx';
import { makeStyles, Paper} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  paperHeader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 15,
    marginRight: 5,
  },
  paper: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 20px'
  }
}));

export const PaperHeader = React.memo(({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={clsx(classes.paperHeader, className)} {...rest}>
      {children}
    </Paper>
  );
});

export const MyPaper = React.memo(({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper} {...rest}>
      {children}
    </Paper>
  );
});
