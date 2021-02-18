import React from "react";
import {
  Grid,
  Typography,
  Paper,
  makeStyles
} from '@material-ui/core';
import {
  HighlightOffSharp,
  CheckCircleOutlineSharp,
  ErrorOutlineSharp,
  RemoveCircleOutlineSharp
} from '@material-ui/icons/';
import BoxHome from '../../Components/Box/Home'

//* SERVICE
import * as Dashboard from '../../Service/dashboard.service'
import * as Service from '../../Api/Service'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '-6rem',
    padding: '0 10px 20px 10px'
  },
  title:{
    padding: 15
  }
}));
  
export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);
  const [half, setHalf] = React.useState(null);
  const [last, setLast] = React.useState(null);
  const [close, setClose] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    Dashboard.MyAtividades().then(Dados => {
      setOpen(Dados.data.open);
      setHalf(Dados.data.half)
      setLast(Dados.data.last);
      setClose(Dados.data.close);
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    })

    return function cleanup() {
      setLoading(false);
      Service.default.cancel('MyAtividades unmonted');
    };

  }, []);

  function handleLink(event){
    console.log(event)
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Minhas Atividades
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <BoxHome
            Icon={CheckCircleOutlineSharp}
            value={open}
            text="Abertas"
            color="green"
            to="/atividades?type=open"
          />
        </Grid>
        <Grid item xs={3}>
          <BoxHome
            Icon={RemoveCircleOutlineSharp}
            value={half}
            loading={loading}
            text="Fecha em 5 dias"
            color="yellow"
            to="/atividades?type=half"
          />
        </Grid>
        <Grid item xs={3}>
          <BoxHome
            Icon={ErrorOutlineSharp}
            value={last}
            loading={loading}
            text="Último dia"
            color="orange"
            to="/atividades?type=last"
          />
        </Grid>
        <Grid item xs={3}>
          <BoxHome
            Icon={HighlightOffSharp}
            value={close}
            loading={loading}
            text="Finalizadas"
            color="red"
            to="/atividades?type=close"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
