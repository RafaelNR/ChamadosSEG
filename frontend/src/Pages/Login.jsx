import React, { useState, useCallback } from 'react';
//* COMPONENTES
import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import Alert from '../Components/Alert/index';
import { ProgressSubmit } from '../Components/Buttons/Progress';
import InputPasswd from '../Components/FormControl/Passwd';

//* CONTEXT
import useAuth from '../Context/AuthContext';
import useLocalStore from '../Hooks/useLocalStore';

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
  }
}));

const MyCheckBox = ({ login, handleChange }) => {
  const classes = useStyles();
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            }
            label="Permanecer"
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default () => {
  const classes = useStyles();
  const { getData } = useLocalStore();
  const { handleLogin, errors, setErrors, success, loading } = useAuth();
  const [login, setLogin] = useState({
    user: getData('lembrar'),
    passwd: ''
  });

  React.useEffect(() => {
    document.title = `Login - OS Técnicos`;
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
  );

  const removeErrors = useCallback((e) => {
    if (errors[e.target.name] && errors.hasOwnProperty(e.target.name)) {
      setErrors((errors) => {
        delete errors[e.target.name];
        return errors;
      });
    }
    // eslint-disable-next-line
  }, []);


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
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              id="username"
              label="Username"
              name="user"
              value={login.user || ''}
              autoComplete="username"
              onChange={handleChange}
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
              handleChange={handleChange}
              onKeyDownCapture={(e) => removeErrors(e)}
              label="Senha *"
              fullWidth
              required
            />
            <MyCheckBox login={login} handleChange={handleChange} />
            <ProgressSubmit success={success} loading={loading}>
              Entrar
            </ProgressSubmit>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Perdeu sua senha?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
