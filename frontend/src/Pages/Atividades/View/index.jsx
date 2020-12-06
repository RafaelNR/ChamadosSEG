import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core/";
import InfosView from "./Infos";
import { Atividade, AtividadeCliente } from "../../../Components/Box/Atividade";
import Loading from '../../../Components/Loading'

//* CONTEXT
import useSnackBar from "../../../Context/SnackBarContext";

//* SERVICE
import { getAtividade } from "../../../Service/atividade.service";
import { getCliente } from "../../../Service/clientes.service";


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
  const [loading, setLoading] = React.useState(true);

  
  React.useEffect(() => {

    async function init(){

      try {
        console.log('view')
        const Dados = await getAtividade(ticket);
        console.log(Dados)
        setAtividade(Dados);
        const Cliente = await getCliente(Dados.cliente_id);
        setCliente(Cliente.data);
        setLoading(false);
        
      } catch (error) {
        handleSnackBar({
          type: "error",
          message: error.message ? error.message : `Erro em carregar a atividade.`,
        });
        return history.replace('/atividades');
      }

    };

    init();

  },[handleSnackBar, history, ticket])
  
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
      <>
        <InfosView infos={atividade.infos} ticket={atividade.ticket} />
      </> 
    </>
  );
}