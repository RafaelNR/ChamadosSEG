import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, Grid, Typography } from '@material-ui/core/';
import ChatIcon from '@material-ui/icons/Chat';
import { PaperHeader, MyPaper } from '../../../Components/Paper/Chamados';
import Prioridade from '../../../Components/Buttons/Prioridade';
import MenuStatus from '../../../Components/Menu/StatusChamado';
import { UserDados } from '../../../Components/Box/User';
import { ClienteDados } from '../../../Components/Box/Cliente';
import { TimeChamado } from '../../../Components/ToolTip/TimeChamado';
import Loading from '../../../Components/Loading/';

//* PROVIDER
import useChamados from '../../../Context/ChamadosContext';
import useLoading from '../../../Context/LoadingContext';
import useSnackBar from '../../../Context/SnackBarContext';

//* HOOKS
import useUser from '../../../Hooks/useUser';

//* SERVICES
import { getChamado } from '../../../Service/chamados.service';

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: '-6rem',
    '& .titulo': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row'
    }
  },
  categoria: {
    fontSize: 16,
    color: theme.palette.text.title,
    fontWeight: 'bold'
  },
  prioridade_status: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginTop: 10,
    marginRight: 5,
    padding: '5px 10px',
    minHeight: 125
  },
  descricao: {
    marginTop: 10,
    '& .header': {
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
    '& pre': {
      height: 250,
      overflow: 'auto',
      margin: 0,
      fontSize: '0.8rem',
      fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0.00938em',
      borderRadius: 5,
      padding: '10px 15px'
    }
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { loading, setLoading } = useLoading();
  const { handleSnackBar } = useSnackBar();
  const { id } = useParams();
  const { userDados } = useUser();
  const { chamado, setChamado } = useChamados();

  useEffect(() => {
    let render = true;
    (async () => {
      try {
        setLoading(true);
        let Dados = null;

        if (userDados && userDados.id) {
          Dados = await getChamado(id);
          if (Dados && Dados.success && render) {
            if (
              userDados.role_id !== 3 ||
              userDados.id === Dados.data.atribuido_id ||
              userDados.id === Dados.data.requerente_id
            ) {
              return setChamado(Dados.data);
            } else throw new Error('Sem permissão para editar a requisição.');
          }
        }
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: error.message || 'Erro em carrega chamado.'
        });
        return history.replace('/chamados');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      return false;
    };
  }, [userDados]);

  return (
    <>
      {!loading && userDados && chamado.id ? (
        <Grid container>
          <Grid item xs={7} className={classes.header}>
            <PaperHeader>
              <Typography variant="h6" component="span">
                C-{id} # {chamado.titulo}
              </Typography>
              <Typography component={'span'} className={classes.categoria}>
                {chamado.categoria} - {chamado.sub_categoria}
              </Typography>
            </PaperHeader>
          </Grid>
          <Grid item xs={3} className={classes.header}>
            <PaperHeader>
              <div className={classes.prioridade_status}>
                <Prioridade type="chamado" />
                <MenuStatus status={chamado.status} />
              </div>
            </PaperHeader>
          </Grid>
          <Grid item xs={2} className={classes.header}>
            <PaperHeader>
              <TimeChamado
                created_at={chamado.created_at}
                updated_at={chamado.updated_at}
              />
            </PaperHeader>
          </Grid>
          <Grid item xs={4} className={classes.box}>
            <MyPaper className={classes.paper}>
              <UserDados id={chamado.requerente_id} title="Requerente" />
            </MyPaper>
          </Grid>
          <Grid item xs={4} className={classes.box}>
            <MyPaper className={classes.paper}>
              <UserDados id={chamado.atribuido_id} title="Atribuído" />
            </MyPaper>
          </Grid>
          <Grid item xs={4} className={classes.box}>
            <MyPaper className={classes.paper}>
              <ClienteDados id={chamado.cliente_id} title="Cliente" />
            </MyPaper>
          </Grid>
          <Grid item xs={12} className={classes.descricao}>
            <MyPaper className="paper">
              <div className="header">
                <div className="grid">
                  <ChatIcon className="icon" />
                  <Typography variant="h6" component="span">
                    Descrição do chamado
                  </Typography>
                </div>
              </div>
              <pre>{chamado.descricao}</pre>
            </MyPaper>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
};
