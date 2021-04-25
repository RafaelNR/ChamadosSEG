import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  box:{
    minWidth: '350px',
    marginTop: '20px',    
    color: 'white',
    '& .MuiAlert-icon':{
      color: 'white',
      alignItems: 'center',
      fontSize: 20
    },
    '& .title':{
      fontSize: 20,
      fontWeight: 'bold',
    }
  },
  error:{
    backgroundColor: '#eb2f06'
  },
  success:{
    backgroundColor: '#44bd32'
  },
  info:{
    backgroundColor: '#0c2461'
  },
  warning:{
    backgroundColor: '#EE5A24'
  },
}));

export default ({ type, title, message }) => {
  const classes = useStyles();
  console.log(type,title,message)
  return (
    <Alert severity={type} className={clsx(classes.box,classes[type])}>
      <AlertTitle className='title'>{title}</AlertTitle>
      {typeof message === 'string' ? message : 'Erro em se conectar ao sistema.Tente mais tarde.'}
    </Alert>
  )

}