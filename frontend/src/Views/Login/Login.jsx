import React, { useEffect } from 'react';
//* COMPONENTES
import {
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { ProgressSubmit } from '../../Components/Buttons/Progress';
import InputPasswd from '../../Components/FormControl/Passwd';
import Switch from './Switch'

//* CONTEXT
import useLogin from '../../Context/LoginContext';

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
  lostpasswd: {
    textAlign: 'end',
    paddingRight: 10
  }
}));

export default () => {
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

  useEffect(() => {
    document.title = `Login - OS Técnicos`;
  }, []);

  useEffect(() => {
    localStorage.removeItem('ErrorMessage');
  });

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmitLogin} noValidate>
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          id="username"
          label="Usuário"
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
        <Switch />
        <ProgressSubmit success={success} loading={loading}>
          Entrar
        </ProgressSubmit>
      </form>
      <Grid container className={classes.lostpasswd}>
        <Grid item xs>
          <Typography
            onClick={handleChangeSlide}
            variant="body2"
            style={{ cursor: 'pointer' }}
          >
            Perdeu sua senha?
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

