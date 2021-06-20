import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, Grid } from '@material-ui/core/';
import { User, NewDescricaoInput } from '../../../Components/Box/AcmChamado';
import { MenuAcmActions } from '../../../Components/Menu/AcmChamados';
import Fade from '../../../Components/Transition/Fade';

//* PROVIDER
import useChamados from '../../../Context/ChamadosContext';
import useAcompanhamento from '../../../Context/AcmChamadoContext';

//* HOOKS
import useUser from '../../../Hooks/useUser';

const useStyles = makeStyles((theme) => ({
  box: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid' + theme.palette.border.common,
    position: 'relative',
    '&:last-child': {
      borderBottom: '0px solid'
    }
  },
  // left: {
  //   '&::after': {
  //     left: '16.5%',
  //     width: 0,
  //     height: 0,
  //     top: '17.5%',
  //     content: '""',
  //     zIndex: 9,
  //     position: 'absolute',
  //     transform: 'rotate(0)',
  //     border: '25px solid',
  //     borderColor:
  //       theme.palette.background.acm + ' transparent transparent transparent'
  //   }
  // },
  // right: {
  //   '&::after': {
  //     right: '15.3%',
  //     width: 0,
  //     height: 0,
  //     top: '17.5%',
  //     content: '""',
  //     zIndex: 9,
  //     position: 'absolute',
  //     transform: 'rotate(0)',
  //     border: '25px solid',
  //     borderColor:
  //       theme.palette.background.acm + ' transparent transparent transparent'
  //   }
  // },
  user: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default () => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { chamado } = useChamados();
  const { tipo, setAcompanhamento } = useAcompanhamento();

  useEffect(() => {
    setAcompanhamento((acm) => {
      return {
        tipo: tipo,
        chamado_id: chamado.id
      };
    });
  },[])

  return (
    <Fade>
      <div
        className={clsx(
          classes.box,
          userDados.id === chamado.requerente_id ? classes.right : classes.left
        )}
      >
        <Grid item xs={10}>
          <NewDescricaoInput>
            <MenuAcmActions tipo="new" />
          </NewDescricaoInput>
        </Grid>
        <Grid item xs={2} className={classes.user}>
          <User
            nome={userDados.nome}
            role_id={userDados.role_id}
            imagem={userDados.imagem}
          />
        </Grid>
      </div>
    </Fade>
  );
};
