import React from 'react';
import {
  makeStyles,
  Typography,
  Tooltip,
} from '@material-ui/core/';
import { QueryBuilderSharp,Restore } from '@material-ui/icons/';
import { dateStartOfChamado, handleDateTime, handleDateTimeFull } from '../../Utils/dates';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 7,
    '& svg': {
      fontSize: 22,
      marginRight: 7
    }
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'start',
    flexDirection: 'row',
    color: theme.palette.text.common,
    '& span': {
      fontSize: 13,
      marginRight: 10,
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': {
      fontSize: 13,
      
    },
  }
}));

export const TimeAcompanhamento = ({ created_at, updated_at }) => {
  const classes = useStyles();
  return (
    <Tooltip
      title={
        created_at !== updated_at
          ? `Atualizado em: ${handleDateTime(updated_at)}`
          : `Criado em: ${handleDateTime(created_at)}`
      }
    >
      <Typography component="span">
        <QueryBuilderSharp />
        {dateStartOfChamado(
          created_at !== updated_at ? updated_at : created_at
        )}
      </Typography>
    </Tooltip>
  );
};

export const TimeChamado = ({ created_at, updated_at }) => {
  const classes = useStyles();
  return (
    <>
      <Tooltip title={`Criado em: ${handleDateTime(created_at)}`}>
        <Typography component="span" className={classes.root}>
          <QueryBuilderSharp />
          {dateStartOfChamado(created_at)}
        </Typography>
      </Tooltip>
      {created_at !== updated_at && (
        <Tooltip title={`Atualizado em: ${handleDateTime(updated_at)}`}>
          <Typography component="span" className={classes.root}>
            <Restore />
            {dateStartOfChamado(updated_at)}
          </Typography>
        </Tooltip>
      )}
    </>
  );
};


export const TimeChamadoBox = ({ created_at, updated_at }) => {
  const classes = useStyles();
  return (
    <div className={classes.time}>
      <Tooltip title="Criado" arrow>
        <Typography component="span">
          <QueryBuilderSharp />
          {handleDateTimeFull(created_at)}
        </Typography>
      </Tooltip>
      {created_at !== updated_at && (
        <Tooltip title="Atualizado" arrow>
          <Typography component="span">
            <Restore />
            {handleDateTimeFull(updated_at)}
          </Typography>
        </Tooltip>
      )}
    </div>
  );
};