import React from "react";
import {
  Grid,
  Paper,
  makeStyles
} from '@material-ui/core';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
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
    top: 25,
    right: 0,
    fontSize: 100,
    color: '#555'
  }
}));


const BoxHome = React.memo((props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <>
        <span style={{ fontSize: 30 }}>{ props.value >= 0 ? props.value : <CircularProgress />}</span>
        <span>{props.children}</span>
        {props.sub && <span>{props.sub}</span>}
        <props.Icon className={classes.icon} />
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
        <BoxHome Icon={AlarmOnIcon} value={open}>
          Atividades Abertas
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome
          Icon={AlarmOnIcon}
          value={half}
          loading={loading}
          sub="em 5 dias"
        >
          Atividades editáveis
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome
          Icon={AlarmOnIcon}
          value={last}
          loading={loading}
          sub="último dia"
        >
          Atividades editáveis
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome Icon={AlarmOnIcon} value={close} loading={loading}>
          Atividades Finalizadas
        </BoxHome>
      </Grid>
    </Grid>
  );
};
