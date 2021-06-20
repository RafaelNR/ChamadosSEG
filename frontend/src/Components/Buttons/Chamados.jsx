import React, { useEffect, useState } from 'react'
import {
  makeStyles,
  Button,
  CircularProgress
} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';


import useChamados from '../../Context/ChamadosContext'
import useLoading from '../../Context/LoadingContext'


const useStyles = makeStyles((theme) => ({
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