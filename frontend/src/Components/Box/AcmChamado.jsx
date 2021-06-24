import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Grid,
  Avatar,
  Typography,
  FormControl,
  TextField,
  CircularProgress
} from '@material-ui/core/';
import { MenuAcmActions } from '../../Components/Menu/AcmChamados';
import { TimeAcompanhamento } from '../ToolTip/TimeChamado';
import { Upload } from '../../Components/Box/Upload';
import { Acompanhamento } from './File';

import { getRoleName } from '../../Utils/functions';

import useAcompanhamento from '../../Context/AcmChamadoContext';

const useStyles = makeStyles((theme) => ({
  user: {
    '& .MuiAvatar-circle': {
      width: 60,
      height: 60,
      margin: 'auto',
      border: '1px solid' + theme.palette.border.common
    },
    '& .nome': {
      paddingTop: 5,
      fontSize: 16,
      color: theme.palette.text.subtitle,
      textAlign: 'center'
    },
    '& .user': {
      fontSize: 13,
      color: theme.palette.text.info,
      textAlign: 'center'
    }
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    '& span': {
      fontSize: 14,
      cursor: 'context-menu'
    },
    '& svg': {
      fontSize: 14,
      marginRight: 5
    }
  },
  time_right: {
    justifyContent: 'flex-end'
  },
  time_left: {
    justifyContent: 'flex-start'
  },
  descricao: {
    width: '98%',
    height: 150,
    display: 'flex',
    color: 'white',
    borderRadius: 7,
    padding: '15px 10px',
    position: 'relative',
    zIndex: 999,
    '& .input': {
      width: '97%'
    },
    '& .MuiOutlinedInput-multiline': {
      height: 120,
      padding: 10
    },
    '& textarea': {
      height: '100%',
      color: 'white'
    },
    '& p': {
      overflow: 'auto',
      width: '100%'
    },
    '& pre': {
      margin: 0,
      fontSize: '0.8rem',
      fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0.00938em'
    }
  },
  loading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  my: {
    background: theme.palette.background.acmMy,
    cursor: 'pointer',
    marginLeft: 20
  },
  other: {
    background: theme.palette.background.acmOther,
    marginRight: 20
  },
  edit: (position) => ({
    background: theme.palette.background.acmEdit,
    margin: position === 'left' ? '0 20px 0 0' : '0 0 0 20px'
  })
}));

export const User = ({ nome, role_id, imagem }) => {
  const classes = useStyles();
  return (
    <div className={classes.user}>
      <Avatar
        alt={nome}
        src={
          imagem
            ? process.env.REACT_APP_ENDPOINT_IMAGES_USER + imagem
            : '/static/logo.png'
        }
      />
      <Typography className="nome">{nome}</Typography>
      <Typography className="user">{getRoleName(role_id)}</Typography>
    </div>
  );
};

export const EditDescricaoText = ({ acm, position }) => {
  const { loading, currID, setCurrID, tipo } = useAcompanhamento();
  const classes = useStyles();

  const handleEdit = (e) => {
    const id = e.currentTarget.dataset.id;
    setCurrID(id);
  };

  return (
    <Grid item xs={10}>
      <div
        className={clsx(
          classes.time,
          position === 'left' ? classes.time_left : classes.time_right
        )}
      >
        <TimeAcompanhamento
          created_at={acm.created_at}
          updated_at={acm.updated_at}
        />
      </div>
      {acm.tipo === '2' ? (
        <div
          className={clsx(
            classes.descricao,
            currID === acm.id ? classes.edit(position) : classes.my
          )}
        >
          <Acompanhamento acm={acm} />
          <MenuAcmActions tipoMenu="deletar" id={acm.id} />
        </div>
      ) : acm.id === parseInt(currID) ? (
        <>
          {loading ? (
            <div
              className={clsx(
                classes.descricao,
                currID === acm.id ? classes.edit(position) : classes.my
              )}
              data-id={acm.id}
            >
              <div className={classes.loading}>
                <CircularProgress color="secondary" />
              </div>
            </div>
          ) : (
            <NewDescricaoInput currID={currID}>
              <MenuAcmActions tipoMenu="edit" />
            </NewDescricaoInput>
          )}
        </>
      ) : (
        <div
          className={clsx(
            classes.descricao,
            currID === acm.id ? classes.edit(position) : classes.my
          )}
          onDoubleClick={tipo === 0 && !currID ? handleEdit : undefined}
          data-id={acm.id}
        >
          {loading && currID === acm.id ? (
            <CircularProgress color="secondary" />
          ) : (
            <pre>{acm.descricao}</pre>
          )}
        </div>
      )}
    </Grid>
  );
};

export const NewDescricaoInput = ({ children }) => {
  const classes = useStyles();
  const {
    acompanhamento,
    setAcompanhamento,
    acompanhamentos,
    errors,
    handleChange,
    loading,
    currID
  } = useAcompanhamento();

  useEffect(() => {
    if (currID) {
      const acm = acompanhamentos.filter(
        (acm) => acm.id === parseInt(currID) && acm
      );
      setAcompanhamento(acm[0]);
    }
  }, [currID]);

  return (
    <div className={clsx(classes.descricao, classes.edit)}>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <FormControl
            variant="outlined"
            className="input"
            error={errors['descricao'] ? true : false}
          >
            <TextField
              id="descricao_acm"
              name="descricao"
              multiline
              rows={3}
              variant="outlined"
              value={acompanhamento.descricao || ''}
              onChange={handleChange}
              error={errors['descricao'] ? true : false}
              helperText={errors['descricao']}
              required
              autoFocus
            />
          </FormControl>
          {children}
        </>
      )}
    </div>
  );
};

export const NewUploadInput = ({ children }) => {
  const classes = useStyles();
  const {
    acompanhamento,
    setAcompanhamento,
    acompanhamentos,
    loading,
    currID
  } = useAcompanhamento();

  useEffect(() => {
    if (currID) {
      const acm = acompanhamentos.filter(
        (acm) => acm.id === parseInt(currID) && acm
      );
      setAcompanhamento(acm[0]);
    }
  }, [currID]);

  return (
    <div className={clsx(classes.descricao, classes.edit)}>
      {loading && !acompanhamento.chamado_id ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <Upload
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            id={acompanhamento.chamado_id}
          />
          {children}
        </>
      )}
    </div>
  );
};

export const ViewDescricaoText = ({ acm, position, user_id }) => {
  const classes = useStyles();

  return (
    <Grid item xs={10}>
      <div
        className={clsx(
          classes.time,
          position === 'left' ? classes.time_left : classes.time_right
        )}
      >
        <TimeAcompanhamento
          created_at={acm.created_at}
          updated_at={acm.updated_at}
        />
      </div>
      <div
        className={clsx(
          classes.descricao,
          user_id === acm.user_id ? classes.my : classes.other
        )}
        data-id={acm.id}
      >
        {acm.tipo === '2' ? (
          <Acompanhamento acm={acm} />
        ) : (
          <pre>{acm.descricao}</pre>
        )}
      </div>
    </Grid>
  );
};
