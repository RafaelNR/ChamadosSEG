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

//& RPOVIDER
import { CategoriasProvider } from '../../../Context/CategoriasContext';
import { LoadingProvider } from '../../../Context/LoadingContext';

//* SERVICE
import { getAtividade } from "../../../Service/atividade.service";
import { getCliente } from "../../../Service/clientes.service";
import Service from '../../../Api/Service';

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
    color: theme.palette.text.title,
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

  React.useEffect(() => {

    getAtividade(ticket)
      .then( async (Dados) => {

        if (!Data.permissionEditAtividade(Dados.date)) {
          throw ({ message: 'Você não pode mais editar essa atividade.'});
        }
  
        setAtividade(Dados);
        setAtividadeInfos(Dados.infos);
        const Cliente = await getCliente(Dados.cliente_id);
        setCliente(Cliente.data);

        return setLoading(false);

      }).catch(error => {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : `Erro em carregar a atividade.`
        });
        return history.replace('/atividades');
      })

    return function cleanup() {
      console.log('ummont atividade')
      return Service.source();
    };
    
  }, [history, ticket]);


  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollTop + 200,
      behavior: 'smooth',
      duration: 5000
    });
  }; 
  

  function incrementInfos() {
    setInfos((_) => infos + 1);
    scroll();
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
          <Loading type="Paper" />
        ) : (
          <Grid container spacing={2}>
            <Atividade Atividade={atividade} />
            <AtividadeCliente Cliente={cliente} />
          </Grid>
        )}
      </Paper>
      { !loading &&
        <LoadingProvider>
          <CategoriasProvider>
            {!loading &&
              atividadeInfos &&
              atividadeInfos.map((info, index) => {
                return (
                  <div key={index}>
                    <InfoEdit Info={info} ticket={atividade.ticket} />
                  </div>
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
          </CategoriasProvider>
        </LoadingProvider>
      }
    </>
  );
};
