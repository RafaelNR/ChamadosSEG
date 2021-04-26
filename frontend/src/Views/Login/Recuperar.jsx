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

//* CONTEXT
import useLogin from '../../Context/LoginContext';

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
  const { handleChangeSlide, recuperar } = useLogin();

  useEffect(() => {
    document.title = `Recuperar senha - OS Técnicos`;
  }, []);

  const handleChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(email)
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
        <Typography className={classes.title} variant="h4">
          Encontre sua senha.
        </Typography>
        <Typography className={classes.title}>Digite seu e-mail para recuperação.</Typography>
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
