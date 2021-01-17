import React from "react";
import {
  Grid,
  Paper,
  makeStyles
} from '@material-ui/core';
import {
  HighlightOffSharp,
  CheckCircleOutlineSharp,
  ErrorOutlineSharp,
  RemoveCircleOutlineSharp
} from '@material-ui/icons/';
import { CircularProgress } from '@material-ui/core'

//* SERVICE
import * as Dashboard from '../Service/dashboard.service'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '-6rem'
  },
  paper: {
    height: 125,
    position: 'relative',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    flexFlow: 'column',
  },
  icon: {
    position: 'absolute',
    top: 40,
    right: 0,
    fontSize: 85,
    opacity: theme.darkMode ? 0.4 : 0.6
  }
}));

const BoxHome = React.memo((props) => {
  const classes = useStyles();

  const colorIcon = props.color;

  return (
    <Paper className={classes.paper}>
      <>
        <span style={{ fontSize: 30 }}>{ props.value >= 0 ? props.value : <CircularProgress />}</span>
        <span>{props.children}</span>
        {props.sub && <span>{props.sub}</span>}
        <props.Icon className={classes.icon} style={{ color: colorIcon }} />
      </>
    </Paper>
  );
});
  
export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);
  const [half, setHalf] = React.useState(null);
  const [last, setLast] = React.useState(null);
  const [close, setClose] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    Dashboard.Atividades().then(Dados => {
      setLoading(false);
      setOpen(Dados.data.open);
      setHalf(Dados.data.half)
      setLast(Dados.data.last);
      setClose(Dados.data.close);
    }).catch(e => {
      setLoading(false);
      console.log(e)
    })

  }, []);


  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={3}>
        <BoxHome
          Icon={CheckCircleOutlineSharp}
          value={open}
          sub="Abertas"
          color="green"
        >
          Atividades
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome
          Icon={RemoveCircleOutlineSharp}
          value={half}
          loading={loading}
          sub="fecha em 5 dias"
          color="yellow"
        >
          Atividades
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome
          Icon={ErrorOutlineSharp}
          value={last}
          loading={loading}
          sub="último dia"
          color="orange"
        >
          Atividades
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome
          Icon={HighlightOffSharp}
          value={close}
          loading={loading}
          sub="Finalizadas"
          color="red"
        >
          Atividades
        </BoxHome>
      </Grid>
    </Grid>
  );
};
