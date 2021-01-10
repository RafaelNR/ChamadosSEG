import React from "react";
import {
  Paper,
  Typography,
  makeStyles
} from "@material-ui/core/";
import AtividadeCreate from "./AtividadeCreate.Form";
import InfoCreate from "./InfoCreate.Form";

//* SERVICE
import { getMyClientes } from '../../../Service/user.service';

//* CONTEXT
import useSnackBar from '../../../Context/SnackBarContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-6rem",
    minHeight: 300
  },
  title: {
    fontSize: "25px",
    padding: "10px",
    color: theme.palette.text.title,
  },
}));

export default () => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [atividadeID, setAtividadeID] = React.useState(null);
  const [clientes, setClientes] = React.useState([]);
  const [ticket, setTicket] = React.useState(null);
  const [infos, setInfos] = React.useState(0);

  
  React.useEffect(() => {
    getMyClientes()
      .then((Dados) => {
        if (Dados.success) {
          setClientes(Dados.data);
        }
      })
      .catch((err) => {
        console.log(err)
        handleSnackBar({
          type: "error",
          message: err && err.message ? err.message : 'Erro em carregar clientes. Por favor tentar mais tarde.',
        });
      });
  }, [handleSnackBar])

  const scroll = () => {
    console.log('acroll')
    window.scrollTo({
      top: document.documentElement.scrollTop + 200,
      behavior: 'smooth',
      duration: 5000
    });
  }; 

  const incrementInfos = React.useCallback(() => {
    setInfos((_) => infos + 1);
    scroll();
  }, [infos]);

  let rows = [];
  for (let i = 0; i < infos; i++) {
    rows.push(i);
  }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography className={classes.title}>Dados da Atividade</Typography>
        <AtividadeCreate
          setAtividadeID={setAtividadeID}
          setTicket={setTicket}
          newInfo={incrementInfos}
          clientes={clientes}
        />
      </Paper>

      {rows.map((id) => {
        return (
          <InfoCreate
            key={id}
            newInfo={incrementInfos}
            atividadeID={atividadeID}
            ticket={ticket}
          />
        );
      })}
    </React.Fragment>
  );
};
