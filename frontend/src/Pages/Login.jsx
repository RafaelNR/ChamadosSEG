import React, { useState, useCallback } from "react";
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
} from "@material-ui/core";
import Alert from '../Components/Alert/index'
import { ProgressSubmit } from '../Components/Buttons/Progress';
import InputPasswd from '../Components/FormControl/Passwd';

//* CONTEXT
import useAuth from "../Context/AuthContext";
import useLocalStore from '../Hooks/useLocalStore'


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundImage: "url(/static/banner.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  gridLogin:{
    backgroundColor: '#f5f5f5',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '65%'
  },
  avatar: {
    width: 100,
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2896ff',
  },
  permanecer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiFormControlLabel-root': {
      marginRight: 0
    }
  }
}));

const MyCheckBox = ({ login, changeCheckBox}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={6}>
        <Tooltip title="Seu username se auto-completa, sempre.">
          <FormControlLabel
            control={
              <Checkbox
                checked={login.lembrar}
              name="lembrar"
              color="primary"
              onChange={(e) => changeCheckBox(e)}
              />
            }
            label="Lembrar-me"
            />
        </Tooltip>
      </Grid>
      <Grid item xs={6} className={classes.permanecer}>
        <Tooltip title="Seu usuário ficará autenticado por 12hs.">
          <FormControlLabel
            control={
              <Checkbox
              checked={login.permanecer}
              name="permanecer"
              color="primary"
              onChange={(e) => changeCheckBox(e)}
              />
            }
            label="Permanecer"
            />
        </Tooltip>
      </Grid>

    </Grid>
  );
}

export default () => {
  const classes = useStyles();
  const { getData,removeData } = useLocalStore();
  const { handleLogin, errors, setErrors, success, loading } = useAuth();
  const [login, setLogin] = useState({
    user: '',
    passwd: '',
    lembrar: false,
    permanecer: false
  });

  React.useEffect(() => {
    document.title = `Login - OS Técnicos`;
    const lembrarUser = getData('lembrar');
    if (lembrarUser) {
      setLogin({
        user: lembrarUser,
        lembrar: true,
      })
    }

  },[])

  //react-hooks/exhaustive-deps
  const handleChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin(login => {
      return {
        ...login,
        [name]: value
      }
    })
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleLogin(login);
    },
    [login]
  );

  const removeErrors = useCallback((e) => {

    if (errors[e.target.name] && errors.hasOwnProperty(e.target.name)) {
      setErrors(errors => {
        delete errors[e.target.name];
        return errors
      });
    }
  },[])

  const changeCheckBox = useCallback((e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    if (name === 'lembrar' && !checked) {
      removeData('lembrar');
    }
    setLogin(login => {
      return {
        ...login,
        [name]: checked
      }
    })
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
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e)}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              id="username"
              label="Username"
              name="user"
              autoComplete="username"
              value={login.user}
              fullWidth
              required
              error={errors && errors['user'] ? true : false}
              helperText={errors && errors['user'] ? errors['user'] : null }
              onChange={(e) => handleChange(e)}
              onKeyDownCapture={(e) => removeErrors(e)}
            />
            <InputPasswd
              value={login.passwd}
              error={errors && errors['passwd'] ? true : false}
              helperText={errors && errors['passwd'] ? errors['passwd'] : null}
              onChange={(e) => handleChange(e)}
              onKeyDownCapture={(e) => removeErrors(e)}
              label="Senha *"
              fullWidth
              required
            />
            <MyCheckBox login={login} changeCheckBox={changeCheckBox}/>
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
}
