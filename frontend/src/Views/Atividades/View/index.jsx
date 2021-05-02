import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  Grid,
} from "@material-ui/core/";
import InfosView from "./Infos";
import {
  Atividade,
  AtividadeCliente,
  AtividadeTecnico
} from '../../../Components/Box/Atividade';
import { PDFIconAtividade } from '../../../Components/Buttons/pdf';
import Loading from '../../../Components/Loading';

//* CONTEXT
import useSnackBar from "../../../Context/SnackBarContext";

//* SERVICE
import { getAtividade } from "../../../Service/atividade.service";
import { getCliente } from "../../../Service/clientes.service";
import { getUser } from "../../../Service/user.service";

import {
  getStatusAtividade
} from '../../../Utils/dates';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '-11rem'
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
          fontSize: '22px !important'
        }
      }
    }
  },
  boxAtividades: {
    minHeight: 200,
    maxHeight: 250,
  }
}));


export default () => {
  const classes = useStyles();
  const { ticket } = useParams();
  const history = useHistory();
  const { handleSnackBar } = useSnackBar();
  const [atividade, setAtividade] = React.useState({});
  const [cliente, setCliente] = React.useState({});
  const [tecnico, setTecnico] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    let render = true;
    setLoading(true);

    (async () => {

      try {

        const Dados = await getAtividade(ticket);
        if(render) setAtividade(Dados);
        const Cliente = await getCliente(Dados.cliente_id);
        if (render) setCliente(Cliente.data);
        const Tecnico = await getUser(Dados.tecnico_id);
        if (render) setTecnico(Tecnico.data);
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
      <div className={classes.root}>
        <div className={classes.icons}>
          {!getStatusAtividade(atividade.date) && (
            <PDFIconAtividade propsClass="buttonPDF" ticket={ticket} />
          )}
        </div>
        {loading ? (
          <Loading type="Paper" />
        ) : (
          <Grid container spacing={2} className={classes.boxAtividades}>
            <Atividade Atividade={atividade} />
            <AtividadeTecnico Tecnico={tecnico} />
            <AtividadeCliente Cliente={cliente} />
          </Grid>
        )}
      </div>
      {loading ? (
        <Loading type="Paper" message="Carregando atividades..." />
      ) : (
        <InfosView
          infos={atividade.infos}
          ticket={atividade.ticket}
          date={atividade.date}
        />
      )}
    </>
  );
}