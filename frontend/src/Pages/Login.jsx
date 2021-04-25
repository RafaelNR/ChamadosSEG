import React, { useState, useCallback } from 'react';
//* COMPONENTES
import {
  CssBaseline,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  makeStyles,
  Tooltip,
  Slide,
} from '@material-ui/core';
import Alert from '../Components/Alert/index';
import { ProgressSubmit } from '../Components/Buttons/Progress';
import InputPasswd from '../Components/FormControl/Passwd';

//* CONTEXT
import useLogin from '../Context/LoginContext';
import useAuth from '../Context/AuthContext';

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
  avatar: {
    width: 100,
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2896ff'
  },
  permanecer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiFormControlLabel-root': {
      marginRight: 0
    }
  },
  title: {
    textAlign: 'center'
  },
  textPointer:{
    cursor: 'pointer'
  }
}));

const OptionsCheckBox = () => {
  const classes = useStyles();
  const {
    login,
    handleChangeLogin,
  } = useLogin();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Tooltip title="Seu username se auto-completa, sempre.">
          <FormControlLabel
            control={
              <Checkbox
                checked={login.lembrar || false}
                name="lembrar"
                color="primary"
                onChange={handleChangeLogin}
              />
            }
            label="Lembrar-me"
          />
        </Tooltip>
      </Grid>
      <Grid item xs={6} className={classes.permanecer}>
        <Tooltip title="Seu usuário permanecerá logado.">
          <FormControlLabel
            control={
              <Checkbox
                checked={login.permanecer || false}
                name="permanecer"
                color="primary"
                onChange={handleChangeLogin}
              />
            }
            label="Permanecer"
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const Login = () => {
  const classes = useStyles();
  const {
    login,
    errors,
    success,
    loading,
    removeErrors,
    handleSubmitLogin,
    handleChangeLogin,
    handleChangeSlide
  } = useLogin();

  React.useEffect(() => {
    document.title = `Login - OS Técnicos`;
<<<<<<< HEAD
  }, []);

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmitLogin} noValidate>
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          id="username"
          label="Username"
          name="user"
          value={login.user || ''}
          autoComplete="username"
          onChange={handleChangeLogin}
          onKeyDownCapture={(e) => removeErrors(e)}
          required
          fullWidth
          error={Boolean(errors['user'])}
          helperText={errors && errors['user'] ? errors['user'] : null}
        />
        <InputPasswd
          value={login.passwd}
          error={errors && errors['passwd'] ? true : false}
          helperText={errors && errors['passwd'] ? errors['passwd'] : null}
          handleChange={handleChangeLogin}
          onKeyDownCapture={(e) => removeErrors(e)}
          label="Senha *"
          fullWidth
          required
        />
        <OptionsCheckBox />
        <ProgressSubmit success={success} loading={loading}>
          Entrar
        </ProgressSubmit>
      </form>
      <Grid container>
        <Grid item xs>
          <Typography
            onClick={handleChangeSlide}
            variant="body2"
            className={classes.textPointer}
          >
            Perdeu sua senha?
          </Typography>
        </Grid>
      </Grid>
    </>
=======
    setLogin((values) => {
      return {
        ...values,
        lembrar: Boolean(getData('lembrar'))
      };
    });
    // eslint-disable-next-line
  }, [setLogin]);

  //react-hooks/exhaustive-deps
  const handleChange = useCallback((e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setLogin((values) => {
      return {
        ...values,
        [name]: value
      };
    });
    // eslint-disable-next-line
  }, [setLogin]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleLogin(login);
    },
    // eslint-disable-next-line
    [login]
>>>>>>> 26b96147ba2120b3735221b6c0c42dd2ec192710
  );
};

<<<<<<< HEAD
const Recuperar = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const { handleChangeSlide, recuperar } = useLogin();

  React.useEffect(() => {
    document.title = `Recuperar senha - OS Técnicos`;
=======
  const removeErrors = useCallback((e) => {
    if (errors[e.target.name] && errors.hasOwnProperty(e.target.name)) {
      setErrors((errors) => {
        delete errors[e.target.name];
        return errors;
      });
    }
    // eslint-disable-next-line
>>>>>>> 26b96147ba2120b3735221b6c0c42dd2ec192710
  }, []);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  },[]);

  return (
    <Slide
      direction="left"
      in={recuperar}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 100 }}
    >
      <div>
        <Typography className={classes.title} variant="h4">
          Encontre sua senha.
        </Typography>
        <Typography className={classes.title}>Digite seu usuário ou seu e-mail de recuperação</Typography>
        <form>
          <TextField
            type="text"
            variant="outlined"
            margin="normal"
            id="dado"
            label="Usuário ou e-mail"
            name="dado"
            value={value}
            autoComplete="username"
            onChange={handleChange}
            required
            fullWidth
          />
          <Grid container>
            <Grid item md={6}>
              <Typography
                onClick={handleChangeSlide}
                variant="body2"
                className={classes.textPointer}
              >
                Voltar
              </Typography>
            </Grid>
            <Grid item md={6}>
              <ProgressSubmit success={false} loading={false}>
                Enviar
              </ProgressSubmit>
            </Grid>
          </Grid>
        </form>
      </div>
    </Slide>
  );
};

export default () => {
  const classes = useStyles();
  const { errors,recuperar } = useLogin();
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
            className={classes.avatar}
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
            <Recuperar />
          ) : (
            <Login  />
          )}
        </div>
      </Grid>
    </Grid>
  );

}