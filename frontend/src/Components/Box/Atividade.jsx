import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core/";

//* Utils
import { handleDateTime } from '../../Utils/dates';

const useStyles = makeStyles((theme) => ({
  gridCliente:{
    width: '600px',
    height: '160px',
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
    border: '1px solid #d9d9d9',
    margin: '10px',
    '& > p': {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#404040',
      '& > span': {
        fontSize: '13px',
        fontWeight: 'normal',
      },
    },
    '& > .title': {
        paddingBottom: '9px',
        color: '#3f51b5 !important'
    },
  },
}));

const AtividadeCliente = ({Atividade, Clientes}) => {
  const classes = useStyles();
  return (
    <Grid item md={6} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
      <Typography className='title'>
        Informações do Cliente
      </Typography>
      {
        Atividade && Atividade.cliente_id ? Clientes.map(cliente => {
          if(cliente.id === Atividade.cliente_id){
            return (
              <>
                <Typography display="block" className={classes.cliente}>Razão Social: <span>{cliente.razao_social}</span></Typography>
                <Typography display="block" className={classes.cliente}>CNPJ/CPF: <span>{cliente.cnpj_cpf}</span></Typography>
                <Typography display="block" className={classes.cliente}>Representante: <span>{cliente.representante}</span></Typography>
                <Typography display="block" className={classes.cliente}>Email: <span>{cliente.email}</span></Typography>
                <Typography display="block" className={classes.cliente}>Telefone: <span>{cliente.telefone}</span></Typography>
              </>
            )
          }
        }) 
        : <Typography display="block" className={classes.notCliente}>Sem cliente vinculado!</Typography>
      }
      </Paper>
    </Grid>
  )
}

const Atividade = ({ Atividade }) => {
  const classes = useStyles();
  return (
    <Grid item md={6} className={classes.gridCliente}>
      <Paper className={classes.paperCliente}>
      <Typography className="title">
        Informações da atividade
      </Typography>
      {
        Atividade && Atividade.ticket ?

          <>
            <Typography display="block" className={classes.cliente}>Ticked: <span>{Atividade.ticket}</span></Typography>
            <Typography display="block" className={classes.cliente}>Técnico: <span>{Atividade['técnico']}</span></Typography>
            <Typography display="block" className={classes.cliente}>Data Abertura: <span>{ handleDateTime(Atividade.created_at) }</span></Typography>
          </>
          
        : <Typography display="block" className={classes.notCliente}>Sem informação!</Typography>
      }
      </Paper>
    </Grid>
  )
}




export {
  Atividade,
  AtividadeCliente
}