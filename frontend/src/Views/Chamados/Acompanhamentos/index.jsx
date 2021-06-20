import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Grid, Typography,Paper } from '@material-ui/core/';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import MenuNewAcm from '../../../Components/Menu/AcmChamados'
import Loading from '../../../Components/Loading/';
import Edit from './Edit';
import New from './New';
import View from './View';

//* PROVIDER
import useChamados from '../../../Context/ChamadosContext';
import useAcompanhamentos from '../../../Context/AcmChamadoContext';
import useSnackBar from '../../../Context/SnackBarContext';

//* SERVICE
import { getAcmChamado } from '../../../Service/chamados.service';

//* HOOKS
import useUser from '../../../Hooks/useUser';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 50,
    borderBottom: '1px solid ' + theme.palette.border.common,
    '& .grid': {
      paddingLeft: 20,
      display: 'flex',
      alignItems: 'center',
      '& span': {
        marginLeft: 20
      }
    },
    '& .icon': {
      color: theme.palette.button.accordion
    }
  },
  box: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid' + theme.palette.background.acm,
    position: 'relative',
    '&:last-child': {
      borderBottom: '0px solid'
    }
  },
  left: {
    '&::after': {
      left: '16.5%',
      width: 0,
      height: 0,
      top: '17.5%',
      content: '""',
      zIndex: 9,
      position: 'absolute',
      transform: 'rotate(0)',
      border: '25px solid',
      borderColor:
        theme.palette.background.acm + ' transparent transparent transparent'
    }
  },
  right: {
    '&::after': {
      right: '15.3%',
      width: 0,
      height: 0,
      top: '17.5%',
      content: '""',
      zIndex: 9,
      position: 'absolute',
      transform: 'rotate(0)',
      border: '25px solid',
      borderColor:
        theme.palette.background.acm + ' transparent transparent transparent'
    }
  },
  user: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  not_acm: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#999'
  }
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { userDados } = useUser();
  const { handleSnackBar } = useSnackBar();
  const { chamado } = useChamados();
  const { acompanhamentos, setAcompanhamentos, tipo } = useAcompanhamentos();

  useEffect(() => {

    (async () => {
      let render = true;
      (async () => {
        try {
          if (chamado && chamado.id) {
            const { success, data } = await getAcmChamado(chamado.id);
            if (render && success)
              return setAcompanhamentos(data);
          }

        } catch (error) {
          console.log(error);
          handleSnackBar({
            type: 'error',
            message: error.message || 'Erro em carrega acompanhamentos do chamado.'
          });
          return history.replace('/chamados');
        }
      })();

      return () => {
        return false;
      };
    })();


  }, [chamado.id])

  return (
    <>
      {chamado.id && (
        <Paper className={classes.root} elevation={0}>
          <Grid container>
            <div className={classes.header}>
              <Grid item xs={10} className="grid">
                <InsertCommentIcon className="icon" />
                <Typography variant="h6" component="span">
                  Histórico de Acompanhamentos
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {chamado.status !== 'Finalizado' && <MenuNewAcm />}
              </Grid>
            </div>
            {tipo > 0 && <New />}
            {acompanhamentos.length >= 1
              ? acompanhamentos.map((acm) => {
                  if (
                    acm.user_id === userDados.id &&
                    chamado.status !== 'Finalizado'
                  ) {
                    return <Edit key={acm.id} acm={acm} />;
                  } else {
                    return <View key={acm.id} acm={acm} />;
                  }
                })
              : tipo === 0 && (
                  <Typography className={classes.not_acm}>
                    Sem Acompanhamentos até o momento.
                  </Typography>
                )}
          </Grid>
        </Paper>
      )}
    </>
  );
};
