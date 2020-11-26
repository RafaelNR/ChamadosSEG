import React, { useCallback } from "react";
import {
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@material-ui/core";
import { uniquesValues, comparaArrays } from "../../Utils/functions";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 200,
    height: 230,
    border: "1px solid #ddd",
    marginTop: "10px",
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "darkblue",
  },
}));

// Retorna o array sem o item selecionado.
function notItem(a, value) {
  return a.filter((b) => b.id != value.id);
}

export default function TransferList({ disponiveis, selecionados, setValue }) {
  const classes = useStyles();
  const [left, setLeft] = React.useState([]); // Disponiveis
  const [right, setRight] = React.useState([]); // Selecionados
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (disponiveis && disponiveis.length > 0) {
      const Uniques = uniquesValues(disponiveis);

      //& Trata o seeds das subcategorias disponiveis e selecionadas.
      if (selecionados && selecionados.length > 0) {
        const { newBigArray, newArray } = comparaArrays(Uniques, selecionados);
        setLeft(newBigArray);
        setRight(newArray);
      } else {
        setLeft(Uniques);
        setRight([]);
      }

      setLoading(false);
    }
  }, [disponiveis, selecionados]);

  // Passa item de disponivel para selecionados
  const clickDisponivel = useCallback(
    (value) => {
      setLeft(notItem(left, value));
      setRight(right.concat(value));
      setValue("add", value.id);
    },
    [right, left, setValue]
  );

  // Passa item de selecionados para disponiveis.
  const clickSelecionados = useCallback(
    (value) => {
      setRight(notItem(right, value));
      setLeft(left.concat(value));
      setValue("del", value.id);
    },
    [right, left, setValue]
  );

  const customList = (itens, fn) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {itens &&
          itens.map((value) => {
            const labelId = `transfer-list-item-${value.id}-label`;
            return (
              <ListItem key={value.id} role="listitem" button>
                <ListItemText
                  id={labelId}
                  primary={value.nome}
                  onClick={() => fn(value)}
                />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      {loading ? (
        <Loading type="Msg" message="Carregando" />
      ) : (
        <>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Typography className={classes.title} component="span">
                Disponíveis
              </Typography>
              {customList(left, clickDisponivel)}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Typography className={classes.title} component="span">
                Selecionadas
              </Typography>
              {customList(right, clickSelecionados)}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
