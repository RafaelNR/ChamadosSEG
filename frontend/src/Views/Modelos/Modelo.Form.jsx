import React, { useState, useEffect, useCallback } from 'react';

//* COMPONENTES
import {
  makeStyles,
  DialogContent,
  Grid,
  FormControl,
  TextField,
  CircularProgress
} from '@material-ui/core/';

import { SelectCategorias, SelectSubCategorias } from './Selects';
import { SaveButton, CancelButton } from '../../Components/Buttons/Index';
import DialogActions from '../../Components/Dialog/Action';

//* CONTEXT
import useModelos from '../../Context/ModelosChamadoContext';
import useDialog from '../../Context/DialogContext';

const useStyles = makeStyles(() => ({
  dialogLoader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 800,
    height: 350
  },
  dialog: {
    width: 800
  },
  formControl: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  }
}));

const FormInsert = React.memo(({ handleSubmit }) => {
  const classes = useStyles();
  const { modelo, setModelo, errors, handleChange } = useModelos();
  const { loading, setLoading } = useDialog();

  React.useEffect(() => {
    setModelo({});
    setLoading(false);
  }, []);

  return (
    <form
      noValidate
      className={loading ? classes.dialogLoader : classes.dialog}
      onSubmit={handleSubmit}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors['titulo'] ? true : false}
                >
                  <TextField
                    id="titulo"
                    name="titulo"
                    label="Titulo"
                    variant="outlined"
                    onChange={handleChange}
                    value={modelo.titulo || ''}
                    error={errors['titulo'] ? true : false}
                    helperText={errors['titulo'] || ''}
                    fullWidth
                    required
                    autoFocus
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <SelectCategorias />
              </Grid>
              <Grid item xs={6}>
                <SelectSubCategorias />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors['descricao'] ? true : false}
                >
                  <TextField
                    id="descricao"
                    name="descricao"
                    label="Descrição"
                    variant="outlined"
                    onChange={handleChange}
                    value={modelo.descricao}
                    error={errors['descricao'] ? true : false}
                    helperText={errors['descricao'] || ''}
                    rows={5}
                    multiline
                    fullWidth
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SaveButton />
          </DialogActions>
        </>
      )}
    </form>
  );
});

const FormUpdate = React.memo(({ handleSubmit }) => {
  const classes = useStyles();
  const { modelo, modelos, setModelo, errors, handleChange } = useModelos();
  const { loading, setLoading } = useDialog();

  React.useEffect(() => {
    if (modelos) {
      const currModelo = modelos.filter((mod) => mod.id === modelo.id)[0];
      setModelo(currModelo);
      setLoading(false);
    }
  }, [modelos]);

  return (
    <form
      noValidate
      className={loading ? classes.dialogLoader : classes.dialog}
      onSubmit={handleSubmit}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors['titulo'] ? true : false}
                >
                  <TextField
                    id="titulo"
                    name="titulo"
                    label="Titulo"
                    variant="outlined"
                    onChange={handleChange}
                    value={modelo.titulo || ''}
                    error={errors['titulo'] ? true : false}
                    helperText={errors['titulo'] || ''}
                    fullWidth
                    required
                    autoFocus
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <SelectCategorias />
              </Grid>
              <Grid item xs={6}>
                <SelectSubCategorias />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors['descricao'] ? true : false}
                >
                  <TextField
                    id="descricao"
                    name="descricao"
                    label="Descrição"
                    variant="outlined"
                    onChange={handleChange}
                    value={modelo.descricao}
                    error={errors['descricao'] ? true : false}
                    helperText={errors['descricao'] || ''}
                    rows={5}
                    multiline
                    fullWidth
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SaveButton />
          </DialogActions>
        </>
      )}
    </form>
  );
});

const FormDelete = React.memo(({ handleSubmit }) => {
  const classes = useStyles();
  const { modelo, modelos, setModelo } = useModelos();
  const { loading, setLoading } = useDialog();

  React.useEffect(() => {
    if (modelos) {
      const currModelo = modelos.filter((mod) => mod.id === modelo.id)[0];
      setModelo(currModelo);
      setLoading(false);
    }
  }, []);

  return (
    <div className={loading ? classes.dialogLoader : classes.dialog}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12} className={classes.formControl}>
                <TextField
                  name="titulo"
                  label="Titulo"
                  variant="outlined"
                  value={modelo.titulo || ''}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6} className={classes.formControl}>
                <TextField
                  name="titulo"
                  label="Categoria"
                  variant="outlined"
                  value={modelo.categoria || ''}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6} className={classes.formControl}>
                <TextField
                  name="titulo"
                  label="Sub Categoria"
                  variant="outlined"
                  value={modelo.sub_categoria || ''}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} className={classes.formControl}>
                <TextField
                  name="titulo"
                  label="Descrição"
                  variant="outlined"
                  value={modelo.descricao || ''}
                  rows={7}
                  multiline
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <CancelButton clickClose={handleSubmit} name="Deletar" />
          </DialogActions>
        </>
      )}
    </div>
  );
});

export default React.memo(() => {
  const { modelo, handleActions, setErrors } = useModelos();
  const { type, setLoading, setOpen } = useDialog();

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors([]);
      handleActions(type)
        .then((resp) => {
          if (resp) {
            setOpen(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [type, modelo]
  );

  switch (type) {
    case 'update':
      return <FormUpdate handleSubmit={handleSubmit} />;

    case 'insert':
      return <FormInsert handleSubmit={handleSubmit} />;

    case 'delete':
      return <FormDelete handleSubmit={handleSubmit} />;

    default:
      break;
  }
});
