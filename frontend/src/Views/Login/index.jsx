import React from 'react';
//* COMPONENTES
import {
  CssBaseline,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Alert from '../../Components/Alert/index';
import Recuperar from './Recuperar';
import Login from './Login'

//* CONTEXT
import useLogin from '../../Context/LoginContext';
import { LoadingProvider } from '../../Context/LoadingContext';

import useAuth from '../../Context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundImage: 'url(/static/banner.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  gridLogin: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '65%'
  },
  logo: {
    width: 100,
    margin: theme.spacing(1)
  },
}));

export default () => {
  const classes = useStyles();
  const { errors, recuperar } = useLogin();
  const { errors: errorsAuth } = useAuth();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        className={classes.gridLogin}
      >
        <div className={classes.paper}>
          <img
            className={classes.logo}
            src="/static/logo.png"
            title="Logo"
            alt="logo"
          />
          {errors && errors.message && !errors.success && (
            <Alert type="error" title="Erro!" message={errors.message} />
          )}
          {errorsAuth && errorsAuth.message && !errorsAuth.success && (
            <Alert type="error" title="Erro!" message={errorsAuth.message} />
          )}
          {recuperar ? (
            <LoadingProvider>
              <Recuperar />
            </LoadingProvider>
          ) : (
            <Login />
          )}
        </div>
      </Grid>
    </Grid>
  );
};
