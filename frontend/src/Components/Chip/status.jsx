import React from 'react';
import clsx from 'clsx'
import { makeStyles, Chip, CircularProgress } from '@material-ui/core/';
import { green,blue,orange } from '@material-ui/core/colors';
import {
  LockOpenSharp,
  PlayArrowSharp,
  PauseSharp,
  DoneAllSharp,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  chip: {
    width: 170,
    cursor: 'pointer',
    '& .MuiChip-icon': {
      color: 'white'
    },
    '& .MuiChip-label': {
      color: 'white',
      width: '75%',
      textAlign: 'center'
    }
  },
  aberto: {
    backgroundColor: green[500]
  },
  andamento: {
    backgroundColor: green[800]
  },
  pendente: {
    backgroundColor: orange[800]
  },
  finalizado: {
    backgroundColor: blue[800]
  }
}));

export default ({ status, loading=false,...rest }) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Chip
        label={status}
        className={clsx(classes.chip)}
        icon={<CircularProgress size={20}/>}
        {...rest}
      />
    );
  }

  switch (status) {
    case 'Aberto':
      return <Chip label={status} className={clsx(classes.chip, classes.aberto)} icon={<LockOpenSharp />} {...rest} />;

    case 'Em Andamento':
      return (
        <Chip
          label={status}
          className={clsx(classes.chip, classes.andamento)}
          icon={<PlayArrowSharp />}
          {...rest}
        />
      );

    case 'Pendente':
      return (
        <Chip
          label={status}
          className={clsx(classes.chip, classes.pendente)}
          icon={<PauseSharp />}
          {...rest}
        />
      );

    case 'Finalizado':
      return (
        <Chip
          label={status}
          className={clsx(classes.chip, classes.finalizado)}
          icon={<DoneAllSharp />}
          {...rest}
        />
      );

    default:
      return (
        <Chip
          label="Sem Status"
          className={clsx(classes.chip)}
          icon={<LockOpenSharp />}
          {...rest}
        />
      );
  }
};

