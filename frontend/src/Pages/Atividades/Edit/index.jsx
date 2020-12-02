import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core/";
import { Atividade, AtividadeCliente } from "../../../Components/Box/Atividade";
import InfoCreate from "../Create/InfoCreate.Form";
import InfoEdit from "./InfoEdit.Form";
import Loading from '../../../Components/Loading'

//* CONTEXT
import useSnackBar from "../../../Context/SnackBarContext";

//* SERVICE
import { getAtividade } from "../../../Service/atividade.service";
import { getCliente } from "../../../Service/clientes.service";

//*UTILS 
import * as Data from '../../../Utils/dates'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-6rem",
    height: 300,
  },
  title: {
    fontSize: "20px",
    padding: "15px",
    color: "#3f51b5 !important",
  },
}));

export default () => {
  const classes = useStyles();
  const { ticket } = useParams();
  const history = useHistory();
  const { handleSnackBar } = useSnackBar();
  const [atividade, setAtividade] = React.useState({});
  const [cliente, setCliente] = React.useState({});
  const [atividadeInfos, setAtividadeInfos] = React.useState([]);
  const [infos, setInfos] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  // TODO Tratar os erros
  React.useEffect(() => {
    async function init() {

      try {
        const Dados = await getAtividade(ticket);

        console.log(Dados, Data.permissionEditAtividade(Dados.date), history)
  
        if(!Data.permissionEditAtividade(Dados.date)){
          throw new Error({ success: false, message: 'Você não pode mais editar essa atividade.'});
          
        }
  
        setAtividade(Dados);
        setAtividadeInfos(Dados.infos);
        const Cliente = await getCliente(Dados.cliente_id);
        setCliente(Cliente.data);
        setLoading(false);
        
      } catch (error) {
        console.log(error)
        handleSnackBar({
          type: "error",
          message: error.message ? error.message : `Erro em carregar a atividade.`,
        });
        return history.replace('/atividades');
      }
    }

    init();
  }, [handleSnackBar, history, ticket]);

  function incrementInfos() {
    setInfos((_) => infos + 1);
  }

  let rows = [];
  for (let i = 0; i < infos; i++) {
    rows.push(i);
  }

  return (
    <>
      <Paper className={classes.root}>
        <Typography className={classes.title}>Dados da Atividade</Typography>
        {loading ? (
          <Loading type='Paper' />
        ) : (
          <Grid container md={12} spacing={2}>
            <Atividade Atividade={atividade} />
            <AtividadeCliente Cliente={cliente} />
          </Grid>
        )}
      </Paper>

      {!loading &&
        atividadeInfos &&
        atividadeInfos.map((info) => {
          return (
            <InfoEdit key={info.id} Info={info} ticket={atividade.ticket} />
          );
        })}

      {!loading &&
        rows.map((id) => {
          return (
            <InfoCreate
              key={id}
              newInfo={incrementInfos}
              atividadeID={atividade.id}
              ticket={atividade.ticket}
            />
          );
        })}
    </>
  );
};
