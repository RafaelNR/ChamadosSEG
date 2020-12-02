import React from "react";
import {
  Paper,
  Typography,
  makeStyles
} from "@material-ui/core/";
import AtividadeCreate from "./AtividadeCreate.Form";
import InfoCreate from "./InfoCreate.Form";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-6rem",
    minHeight: 300
  },
  title: {
    fontSize: "25px",
    padding: "10px",
    color: "#3f51b5",
  },
}));

export default () => {
  const classes = useStyles();
  const [atividadeID, setAtividadeID] = React.useState(null);
  const [ticket, setTicket] = React.useState(null);
  const [infos, setInfos] = React.useState(0);

  const incrementInfos = React.useCallback(() => {
    setInfos((_) => infos + 1);
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
