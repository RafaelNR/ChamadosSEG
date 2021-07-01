import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Grid, Typography, Badge } from '@material-ui/core/';
import { FlagSharp, AttachFileSharp, CommentSharp } from '@material-ui/icons';
import { ArrowIconTooltips } from '../../Components/ToolTip/index';
import { TimeChamadoBox } from '../../Components/ToolTip/TimeChamado';
import ChipStatus from '../Chip/status';
import { ChipUser } from '../Chip/user';

//* HOOK
import useUser from '../../Hooks/useUser';

const useStyles = makeStyles((theme) => ({
  cell: {
    marginTop: 10,
    background: theme.darkMode ? '#777' : '#ddd',
    transition: '0.3s',
    borderRadius: 5,
    '&:hover': {
      background: theme.darkMode ? '#666' : '#ccc',
      transition: '0.3s'
    }
  },
  body: {
    padding: 16,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    alignitems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  titulo: {
    fontSize: 17,
    fontWeight: 600,
    color: theme.palette.text.title
  },
  rapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: 25,
    '& > span': {
      fontSize: 13,
      color: theme.palette.primary.main,
      fontWeight: 600,
      lineHeight: 3
    }
  },
  flags: {
    display: 'flex',
    flexDirection: 'column',
    '& .icons': {
      height: 35,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& svg': {
        fontSize: 20,
        width: 40
      },
      '& .MuiBadge-anchorOriginTopRightRectangle': {
        right: 10,
        color: 'white',
        fontWeight: 100
      }
    },
    '& .user': {
      fontSize: 12,
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 10
    }
  },
  prioridade: (props) => ({
    color: theme.darkMode
      ? props.prioridade
        ? '#c23616'
        : '#aaaaaa'
      : props.prioridade
      ? '#c0392b'
      : '#999999'
  }),
  anexo: (props) => ({
    color: theme.darkMode
      ? props.anexo
        ? '#6D214F'
        : '#aaaaaa'
      : props.anexo
      ? '#6D214F'
      : '#999999'
  }),
  acompanhamentos: (props) => ({
    color: theme.darkMode
      ? props.acompanhamentos
        ? theme.palette.primary.main
        : '#aaaaaa'
      : props.acompanhamentos
      ? theme.palette.primary.main
      : '#999999'
  })
}));

export default ({ chamado, tab }) => {
  const classes = useStyles({
    acompanhamentos: chamado.acompanhamentos,
    prioridade: chamado.prioridade,
    anexo: parseInt(chamado.anexo),
  });
  const { userDados } = useUser();

  const {
    id,
    requerente_id,
    requerente,
    requerente_imagem,
    atribuido_id,
    atribuido,
    atribuido_imagem,
    cliente,
    status,
    prioridade,
    anexo,
    acompanhamentos,
    categoria,
    sub_categoria,
    titulo,
    created_at,
    updated_at
  } = chamado;

  const handleLink = useCallback(() => {
    if (userDados.role_id !== 3) {
      return `/chamado/edit/${chamado.id}`;
    } else if (
      chamado.status === 'Finalizado' ||
      chamado.requerente_id !== userDados.id
    ) {
      return `/chamado/view/${chamado.id}`;
    } else {
      return `/chamado/edit/${chamado.id}`;
    }
  }, [userDados]);

  return (
    <>
      {userDados && (
        <Link to={handleLink}>
          <div className={classes.cell}>
            <div className={classes.body}>
              <Grid container className={classes.header}>
                <Grid item xs={8}>
                  <TimeChamadoBox
                    created_at={created_at}
                    updated_at={updated_at}
                  />
                  <Typography className={classes.titulo}>
                    C-{id} # {titulo}
                  </Typography>
                  <Typography className={classes.rapper}>
                    <Typography component="span">
                      {cliente} - {categoria} - {sub_categoria}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={4} className={classes.flags}>
                  <div className="icons">
                    <ArrowIconTooltips
                      title={
                        acompanhamentos >= 1
                          ? 'Com acompanhamentos'
                          : 'Sem acompanhamentos'
                      }
                    >
                      {acompanhamentos ? (
                        <Badge
                          badgeContent={parseInt(acompanhamentos)}
                          color="primary"
                        >
                          <CommentSharp className={classes.acompanhamentos} />
                        </Badge>
                      ) : (
                        <CommentSharp className={classes.acompanhamentos} />
                      )}
                    </ArrowIconTooltips>
                    <ArrowIconTooltips
                      title={parseInt(anexo) ? 'Com anexo' : 'Sem anexo'}
                    >
                      <AttachFileSharp className={classes.anexo} />
                    </ArrowIconTooltips>
                    <ArrowIconTooltips
                      title={prioridade ? 'Com prioridade' : 'Sem prioridade'}
                    >
                      <FlagSharp className={classes.prioridade} />
                    </ArrowIconTooltips>
                    <ChipStatus status={status} />
                  </div>
                  <div className="user">
                    <ChipUser nome={requerente} img={requerente_imagem} tooltip label="Requerente" style={{marginRight: 5}}/>
                    <ChipUser nome={atribuido} img={atribuido_imagem} tooltip label="Atribuído" />
                    {/* <ChipUser
                      nome={tab === 'Atribuído' ? requerente : atribuido}
                      img={
                        tab === 'Atribuído'
                          ? requerente_imagem
                          : atribuido_imagem
                      }
                      tooltip
                      label={tab === 'Atribuído' ? 'Requerente' : 'Atribuído'}
                    /> */}
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
