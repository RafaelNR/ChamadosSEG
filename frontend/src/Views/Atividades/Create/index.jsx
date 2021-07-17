import React from "react";
import {
  makeStyles
} from "@material-ui/core/";
import AtividadeCreate from "./AtividadeCreate.Form";
import InfoCreate from "./InfoCreate.Form";

//* SERVICE
import { getMyClientes } from '../../../Service/clientes.service';

//* CONTEXT
import useSnackBar from '../../../Context/SnackBarContext';

//* HOOKS
import useUser from '../../../Hooks/useUser';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-6rem",
    height: 190
  },
}));

export default () => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const { userDados } = useUser();
  const [atividadeID, setAtividadeID] = React.useState(null);
  const [clientes, setClientes] = React.useState([]);
  const [ticket, setTicket] = React.useState(null);
  const [infos, setInfos] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  
  React.useEffect(() => {
    setLoading(true);
    getMyClientes()
      .then((Dados) => {
        console.log(Dados)
        if (Dados.success) {
          setClientes(Dados.data);
        }
      })
      .catch((err) => {
        console.log(err);
        handleSnackBar({
          type: 'error',
          message:
            err && err.message
              ? err.message
              : 'Erro em carregar clientes. Por favor tentar mais tarde.'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line
  }, [])

  const scroll = () => {
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
      <div className={classes.root}>
        {!loading && clientes && (
          <AtividadeCreate
            setAtividadeID={setAtividadeID}
            setTicket={setTicket}
            newInfo={incrementInfos}
            clientes={clientes}
            tecnico={userDados}
          />
        )}
      </div>

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
