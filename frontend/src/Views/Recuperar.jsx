import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core/';
import { ProgressSubmit } from '../Components/Buttons/Progress';
import InputPasswd from '../Components/FormControl/Passwd';
import Alert from '../Components/Alert';

//* CONTEXT

//* HOOKS
import useQuery from '../Hooks/useQuery';
import useForms from '../Hooks/useForm';

//* SERVICE
import { getHash, changePasswd } from '../Service/recuperar_senha.service';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    //backgroundImage: 'url(/static/banner.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 600,
    height: 'auto',
    padding: 10
  },
  logo: {
    width: 65,
    marginTop: theme.spacing(3)
  },
  text: {
    width: 350,
    fontSize: 15,
    textAlign: 'justify',
    paddingTop: 20
  },
  orientacoes: {
    width: 350,
    fontSize: 12,
    textAlign: 'left'
  },
  form: {
    marginTop: 20,
  },
  input: {
    width: 350,
  },
  button: {
    justifyContent: 'center'
  }
}));

export default () => {
  const classes = useStyles();
  const { getQuery } = useQuery();
  const { values, setValues, handleChangeValues } = useForms({
    hash: '',
    passwd: ''
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let render = true;
    const hash = getQuery('hash');

    if (hash) {
      (async () => {
        try {
          const resp = await getHash(hash);
          if (!resp.success) throw new Error(resp.message);

          if (render) {
            setValues((props) => Object.assign({}, props, resp));
          }
        } catch (error) {
          console.log(error);
          return history.push('/');
        } finally {
          setLoading(false);
        }
      })();
    } else {
      console.log('Hash não informada.');
      history.push('/');
    }

    return function cleanup() {
      render = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await changePasswd(values);

      console.log(resp);

      if (resp.error || !resp.success) {
        throw new Error(resp.message);
      }

      setSuccess(true);

      setTimeout(() => {
        return history.push('/');
      },2000)

    } catch (error) {
      console.log(error);
      setError(error.message ? error.message : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={clsx(classes.image, classes.grid)}>
        <Paper className={clsx(classes.paper)}>
          <img
            className={classes.logo}
            src="/static/logo.png"
            title="Logo"
            alt="logo"
          />
          {success && !loading ? (
            <Alert
              type="success"
              title="Sucesso"
              message="Sua senha foi atualizada!"
            />
          ) : (
            <>
              <Typography variant="h5" component="span">
                Recuperando a senha de acesso.
              </Typography>
              <Typography
                variant="body1"
                component="span"
                className={classes.text}
              >
                Insira sua nova senha de acesso:
              </Typography>
              <Typography
                variant="body1"
                component="span"
                className={classes.orientacoes}
              >
                - Deve conter de 8 - 30 caracteres;
              </Typography>
            </>
          )}
          <form onSubmit={handleSubmit} method="post" className={classes.form}>
            <InputPasswd
              onChange={handleChangeValues}
              className={classes.input}
              value={values.passwd || ''}
              error={Boolean(error)}
              helperText={error ? error : ''}
              label="Nova Senha *"
              fullWidth
              required
            />
            <Grid container className={classes.button}>
              <Grid item md={6}>
                <ProgressSubmit success={success} loading={loading}>
                  Salvar
                </ProgressSubmit>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
