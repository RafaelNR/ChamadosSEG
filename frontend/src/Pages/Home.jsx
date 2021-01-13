import React from "react";
import {
  Grid,
  Paper,
  makeStyles
} from '@material-ui/core';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

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


const BoxHome = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <span style={{ fontSize: 30 }}>{props.value}</span>
      <span>{props.children}</span>
      {props.sub && <span>{props.sub}</span> }
      <props.Icon className={classes.icon} />
    </Paper>
  );
}
  

export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(0);
  const [five, setFive] = React.useState(0);
  const [last, setLast] = React.useState(0);
  const [close, setClose] = React.useState(0);


  React.useEffect(() => {

    // const { open, five, last, close } = await Service.atividadesHome();

  }, []);


  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={3}>
        <BoxHome Icon={AlarmOnIcon} value={open}>
          Atividades Abertas
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome Icon={AlarmOnIcon} value={five} sub="em 5 dias">
          Atividades editáveis
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome Icon={AlarmOnIcon} value={last} sub="último dia">
          Atividades editáveis
        </BoxHome>
      </Grid>
      <Grid item xs={3}>
        <BoxHome Icon={AlarmOnIcon} value={close}>
          Atividades Finalizadas
        </BoxHome>
      </Grid>
    </Grid>
  );
};
