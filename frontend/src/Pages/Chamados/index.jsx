import React from 'react';
import { Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

//* COMPONENTES
import TabChamados from './TabChamados';

//* PROVIDER
import { ChamadosProvider } from '../../Context/ChamadosContext';
import { LoadingProvider } from '../../Context/LoadingContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '-6rem'
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <LoadingProvider>
      <ChamadosProvider>
        <Paper className={classes.root}>
          <TabChamados />
        </Paper>
      </ChamadosProvider>
    </LoadingProvider>
  );
};
