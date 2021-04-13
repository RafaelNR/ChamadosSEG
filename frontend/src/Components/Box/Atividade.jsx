import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core/";

//* Utils
import { handleDateTime, handleDate, dateEndOfAtividade,getColorAtividade } from "../../Utils/dates";

const useStyles = makeStyles((theme) => ({
  gridCliente: {
    width: '600px',
    height: '160px'
  },
  notCliente: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#aaa !important'
  },
  paperCliente: {
    padding: '15px 28px',
    height: 180,
    '& > p': {
      fontWeight: 'bold',
      fontSize: '14px',
      color: theme.palette.text.atividade,
      '& > span': {
        fontSize: '13px',
        fontWeight: 'normal',
        color: theme.palette.text.common
      }
    },
    '& > .title': {
      paddingBottom: '9px',
      color: theme.palette.text.subtitle
    }
  },
  status: {
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Atividade = ({ Atividade }) => {
  const classes = useStyles();

  const getDate = useCallback((date) => {
    return dateEndOfAtividade(Atividade.date);
  }, []);

  return (
    <Grid item md={3} xl={3} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
        <Typography className="title">Atividade</Typography>
        {Atividade && Atividade.ticket ? (
          <>
            {Atividade.date && (
              <Typography display="block" className={classes.cliente}>
                Data da Atividade: <span>{handleDate(Atividade.date)}</span>
              </Typography>
            )}
            <Typography display="block" className={classes.cliente}>
              Ticked: <span>{Atividade.ticket}</span>
            </Typography>
            <Typography display="block" className={classes.cliente}>
              Data Abertura: <span>{handleDateTime(Atividade.created_at)}</span>
            </Typography>
            <Typography
              className={classes.status}
              component="span"
              style={{
                ...getColorAtividade(Atividade.date)
              }}
            >
              {getDate(Atividade.date) !== 'close'
                ? 'Fecha ' + getDate(Atividade.date)
                : 'Fechada'}
            </Typography>
          </>
        ) : (
          <Typography display="block" className={classes.notCliente}>
            Sem informação!
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

const AtividadeClientes = ({ Atividade, Clientes }) => {
  const classes = useStyles();
  return (
    <Grid item md={6} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
        <Typography className="title">Cliente</Typography>
        {Atividade && Atividade.cliente_id ? (
          Clientes.map((cliente) => {
            return cliente.id === Atividade.cliente_id &&
              (
                <>
                  <Typography display="block" className={classes.cliente}>
                    Razão Social: <span>{cliente.razao_social}</span>
                  </Typography>
                  <Typography display="block" className={classes.cliente}>
                    CNPJ/CPF: <span>{cliente.cnpj_cpf}</span>
                  </Typography>
                  <Typography display="block" className={classes.cliente}>
                    Representante: <span>{cliente.representante}</span>
                  </Typography>
                  <Typography display="block" className={classes.cliente}>
                    Email: <span>{cliente.email}</span>
                  </Typography>
                  <Typography display="block" className={classes.cliente}>
                    Telefone: <span>{cliente.telefone}</span>
                  </Typography>
                </>
              );
          })
        ) : (
          <Typography display="block" className={classes.notCliente}>
            Sem cliente vinculado!
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

const AtividadeCliente = ({ Cliente }) => {
  const classes = useStyles();
  return (
    <Grid item md={6} xl={6} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
        <Typography className="title">Cliente</Typography>
        <Typography display="block" className={classes.cliente}>
          Razão Social: <span>{Cliente.razao_social}</span>
        </Typography>
        <Typography display="block" className={classes.cliente}>
          CNPJ/CPF: <span>{Cliente.cnpj_cpf}</span>
        </Typography>
        <Typography display="block" className={classes.cliente}>
          Representante: <span>{Cliente.representante}</span>
        </Typography>
        <Typography display="block" className={classes.cliente}>
          Email: <span>{Cliente.email}</span>
        </Typography>
        <Typography display="block" className={classes.cliente}>
          Telefone: <span>{Cliente.telefone}</span>
        </Typography>
      </Paper>
    </Grid>
  );
};

const AtividadeTecnico = ({ Tecnico }) => {
  const classes = useStyles();
  return (
    <Grid item md={3} xl={3} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
        <Typography className="title">Técnico</Typography>
        {Tecnico && Tecnico.nome ? (
          <>
            <Typography display="block" className={classes.cliente}>
              Criado por: <span>{Tecnico.nome}</span>
            </Typography>
            <Typography display="block" className={classes.cliente}>
              Email: <span>{Tecnico.email}</span>
            </Typography>
            <Typography display="block" className={classes.cliente}>
              Telefone: <span>{Tecnico.telefone}</span>
            </Typography>
          </>
        ) : (
          <Typography display="block" className={classes.notCliente}>
            Carregando...
          </Typography>
        )}
      </Paper>
    </Grid>
  );
}

export { Atividade, AtividadeCliente, AtividadeClientes, AtividadeTecnico };
