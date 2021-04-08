import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Grid,
} from "@material-ui/core/";
import InfosView from "./Infos";
import { Atividade, AtividadeCliente } from "../../../Components/Box/Atividade";
import Loading from '../../../Components/Loading'
import { PDFIconAtividade } from '../../../Components/Buttons/pdf';

//* CONTEXT
import useSnackBar from "../../../Context/SnackBarContext";

//* SERVICE
import { getAtividade } from "../../../Service/atividade.service";
import { getCliente } from "../../../Service/clientes.service";

import {
  getStatusAtividade
} from '../../../Utils/dates';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '-6rem',
    height: 300
  },
  header: {
    paddingTop: 5
  },
  title: {
    fontSize: '20px',
    padding: '15px',
    color: theme.palette.text.title
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 50,
    padding: '5px 10px',
    '& .buttonPDF': {
      ' & .MuiButton-startIcon': {
        marginRight: -3,
        '& svg': {
          fontSize: '22px !important',
        }
      }
    }
  }
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
    let render = true;
    setLoading(true);

    (async () => {

      try {
        const Dados = await getAtividade(ticket);

        if(render) setAtividade(Dados);
        const Cliente = await getCliente(Dados.cliente_id);
        
        if(render) setCliente(Cliente.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : `Erro em carregar a atividade.`
        });
        return history.replace('/atividades');
      }

    })()

    return () => {
      render = false;
    }

  }, [handleSnackBar, history, ticket])

  
  return (
    <>
      <Paper className={classes.root}>
        <Grid container className={classes.header}>
          <Grid item md={6}></Grid>
          <Grid item md={6} className={classes.icons}>
            {getStatusAtividade(atividade.date) === 'red' && (
              <PDFIconAtividade
                propsClass="buttonPDF"
                ticket={ticket}
              />
            )}
          </Grid>
        </Grid>
        {loading ? (
          <Loading type="Paper" />
        ) : (
          <Grid container spacing={2}>
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