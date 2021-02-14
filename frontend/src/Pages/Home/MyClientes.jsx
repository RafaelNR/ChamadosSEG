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
import { SelectCommon } from '../../Components/FormControl/Selects';


//* SERVICE
import * as Dashboard from '../../Service/dashboard.service'
import { getMyClientes } from '../../Service/user.service'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 10px 20px 10px',
    marginTop: 15
  },
  title: {
    padding: 15
  },
  gridselect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));


const Select = React.memo(({ changeCliente , clienteCurr}) => {
  const [clientes, setClientes] = React.useState([]);

  React.useEffect(() => {
    getMyClientes()
      .then((Clientes) => {
        if (Clientes.data.length > 1) {
          setClientes(Clientes.data);
        } else if (Clientes.data.length === 1) {
          setClientes(Clientes.data[0]);
        } else {
          setClientes([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    clientes.length > 0 && (
      <SelectCommon
        handleChange={changeCliente}
        name="cliente"
        title="Clientes"
        itens={clientes}
        value={clienteCurr}
      />
    )
  );
});
       
export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);
  const [half, setHalf] = React.useState(null);
  const [last, setLast] = React.useState(null);
  const [close, setClose] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [clienteCurr, setClienteCurr] = React.useState('todos');

  React.useEffect(() => {
    setLoading(true);
    Dashboard.MyClientesAtividades().then((Dados) => {
      setLoading(false);
      setOpen(Dados.data.open);
      setHalf(Dados.data.half);
      setLast(Dados.data.last);
      setClose(Dados.data.close);
    }).catch((e) => {
      setLoading(false);
      console.log(e);
    });

  }, []);

  const changeCliente = React.useCallback( async (event) => {
    setClienteCurr(event.target.value);
    setLoading(true);

    console.log(event.target.value);

    try {
      setLoading(false);
      let Dados = '';
      if (event.target.value === 'todos') {
        Dados = await Dashboard.MyClientesAtividades();
      } else {
        Dados = await Dashboard.ClienteAtividades(event.target.value);
      }

      const { open, half, last, close } = Dados.data;

      setOpen(open);
      setHalf(half);
      setLast(last);
      setClose(close);
      return;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    
  }, []);


  return (
    <Paper className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h6" className={classes.title}>
            Atividades Clientes
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.gridselect}>
          <Select clienteCurr={clienteCurr} changeCliente={changeCliente}/>
        </Grid>
      </Grid>

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
