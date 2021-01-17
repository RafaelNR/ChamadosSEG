import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    backgroundColor: theme.darkMode ? '#404040' : 'white',
    borderTop: theme.darkMode
      ? '1px solid rgba(255, 255, 255, 0.12)'
      : '1px solid #ccc',
    color: '#707070',
    paddingLeft: 100,
    flexDirection: 'column',
    paddingTop: 5,
    '& span': {
      fontSize: 10
    }
  }
}));



export default React.memo(() => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <span> Versão: {process.env.REACT_APP_VERSION} </span>
        <span> Suporte/Bugs: {process.env.REACT_APP_DEV}</span>
      </div>
    </div>
  );

})