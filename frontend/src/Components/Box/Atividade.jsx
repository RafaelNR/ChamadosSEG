import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core/";

//* Utils
import { handleDateTime, handleDate } from "../../Utils/dates";

const useStyles = makeStyles((theme) => ({
  gridCliente: {
    width: "600px",
    height: "160px",
  },
  notCliente: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#aaa !important",
  },
  paperCliente: {
    padding: "15px 28px",
    border: "1px solid #d9d9d9",
    margin: "10px",
    "& > p": {
      fontWeight: "bold",
      fontSize: "14px",
      color: theme.palette.text.atividade,
      "& > span": {
        fontSize: "13px",
        fontWeight: "normal",
      },
    },
    "& > .title": {
      paddingBottom: "9px",
      color: "#3f51b5 !important",
    },
  },
}));

const AtividadeClientes = ({ Atividade, Clientes }) => {
  const classes = useStyles();
  return (
    <Grid item md={6} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
        <Typography className="title">Informações do cliente</Typography>
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
    <Grid item md={6} xl={12} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
        <Typography className="title">Informações do Cliente</Typography>
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

const Atividade = ({ Atividade }) => {
  const classes = useStyles();
  return (
    <Grid item md={6} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
        <Typography className="title">Informações da atividade</Typography>
        {Atividade && Atividade.ticket ? (
          <>
            { Atividade.date 
              &&  ( 
                <Typography display="block" className={classes.cliente}>
                Data da Atividade: <span>{handleDate(Atividade.date)}</span>
                </Typography>
              )
            }
            <Typography display="block" className={classes.cliente}>
              Ticked: <span>{Atividade.ticket}</span>
            </Typography>
            <Typography display="block" className={classes.cliente}>
              Técnico: <span>{Atividade["técnico"]}</span>
            </Typography>
            <Typography display="block" className={classes.cliente}>
              Data Abertura: <span>{handleDateTime(Atividade.created_at)}</span>
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

export { Atividade, AtividadeCliente, AtividadeClientes };
