import React from "react";
import {
  Grid,
  Paper,
  makeStyles
} from '@material-ui/core';
import MyAtividades from './MyAtividades'
import MyClientes from './MyClientes'


const useStyles = makeStyles((theme) => ({

}));
  
export default () => {
  const classes = useStyles();

  return (
    <>
      <MyAtividades />
      <MyClientes />
    </>
  );
};
