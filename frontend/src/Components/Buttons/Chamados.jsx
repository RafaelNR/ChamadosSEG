import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Button,
  CircularProgress
} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';


//* CONTEXT
import useChamados from '../../Context/ChamadosContext'
import useLoading from '../../Context/LoadingContext'


const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1)
  },
  clear: {
    color: theme.darkMode ? 'white' : '#0B4672',
    border: theme.darkMode
      ? '1px solid rgba(255, 255, 255, 0.23)'
      : '1px solid rgba(11, 70, 114, 0.5)'
  }
}));

export const Save = () => {
  const classes = useStyles();
  const { handleSubmit } = useChamados();
  const { loading } = useLoading();
  
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handleSubmit}
      className={classes.button}
      disabled={loading}
      startIcon={
        loading ? (
          <CircularProgress size={20} />
          ) : (
          <SaveIcon />
        )
      }
    >
      Save
    </Button>
  );
}

export const Clear = () => {
  const classes = useStyles();
  const { setChamado, setCurrModelo } = useChamados();

  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      onClick={() => {
        setChamado({});
        setCurrModelo(null);
      }}
      className={clsx(classes.button, classes.clear)}
    >
      Limpar
    </Button>
  );
};