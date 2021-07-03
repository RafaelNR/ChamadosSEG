import React, { useState, useCallback, useEffect } from 'react';
//* COMPONENTES
import {
  TextField,
  Typography,
  Grid,
  makeStyles,
  Slide,
} from '@material-ui/core';
import { ProgressSubmit } from '../../Components/Buttons/Progress';
import Alert from '../../Components/Alert'

//* CONTEXT
import useLogin from '../../Context/LoginContext';
import useLoading from '../../Context/LoadingContext';

//* SERVICE
import { Recuperar } from '../../Service/login.service'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center'
  },
  textPointer:{
    cursor: 'pointer'
  }
}));

export default () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const { loading, setLoading, success, setSuccess} = useLoading();
  const { handleChangeSlide, recuperar, setErrors } = useLogin();

  useEffect(() => {
    document.title = `Recuperar senha - OS Técnicos`;
  }, []);

  const handleChange = useCallback((e) => {
    setEmail(e.target.value);
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    setLoading(true);

    Recuperar(email)
      .then((resp) => {
        setSuccess(true);
        setLoading(false);
        setErrors([]);
      })
      .catch((error) => {
        console.log('Error: ', error);
        setSuccess(false);
        setLoading(false);
        setErrors(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[email])

  return (
    <Slide
      direction="left"
      in={recuperar}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 100 }}
    >
      <div>
        {success && !loading && (
          <Alert
            type="success"
            title="Sucesso"
            message="Email de recuperação enviado."
          />
        )}
        <Typography className={classes.title} variant="h4">
          Encontre sua senha.
        </Typography>
        <Typography className={classes.title}>
          Digite seu e-mail para recuperação.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            variant="outlined"
            margin="normal"
            id="email"
            label="E-mail"
            name="email"
            value={email}
            autoComplete="email"
            onChange={handleChange}
            required
            fullWidth
            disabled={success}
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
              <ProgressSubmit success={success} loading={loading}>
                Enviar
              </ProgressSubmit>
            </Grid>
          </Grid>
        </form>
      </div>
    </Slide>
  );
};
