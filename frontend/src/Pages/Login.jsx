import React, { useState, useCallback } from "react";
//* COMPONENTES
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  makeStyles,
} from "@material-ui/core";
import Alert from '../Components/Alert/index'

//* CONTEXT
import useAuth from "../Context/AuthContext";

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
}));

export default function SignInSide() {
  const classes = useStyles();
  const { handleLogin, errors } = useAuth();
  const [user, setUser] = useState(null);
  const [passwd, setPasswd] = useState(null);

  const handleChange = useCallback((e) => {
    const el = e.target.name;
    if (el === "user") setUser(e.target.value);
    if (el === "passwd") setPasswd(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleLogin(user, passwd);
    },
    [user, passwd, handleLogin]
  );
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6} square className={classes.gridLogin}>
        <div className={classes.paper}>
          <img className={classes.avatar} src='/static/logo.png' title="Logo"/>
          { errors.message && !errors.success && <Alert type="error" title='Erro!' message={errors.message} /> }
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
              autoComplete="user"
              fullWidth
              required
              autoFocus
              error={errors['user'] ? true : false}
              helperText={errors['user']}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              id="password"
              label="Senha"
              type="password"
              name="passwd"
              autoComplete="current-password"
              fullWidth
              required
              error={errors['passwd'] ? true : false}
              helperText={errors['passwd']}
              onChange={(e) => handleChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
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
