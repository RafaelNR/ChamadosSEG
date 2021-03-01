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
import * as Service from '../../Api/Service';
import * as Dashboard from '../../Service/dashboard.service'
import { getMyClientes } from '../../Service/user.service'
import { getClientes } from '../../Service/clientes.service'

// HOOK
import useLocalStore from '../../Hooks/useLocalStore'

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
  const { getData } = useLocalStore();

  React.useEffect(() => {

    const { role_id } = getData('user');

    if (role_id === 3) {
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
    } else {
      getClientes()
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
    }

    
    return function cleanup() {
      Service.default.cancel('MyAtividades unmonted');
    };
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
  const { getData } = useLocalStore();
  const [open, setOpen] = React.useState(null);
  const [half, setHalf] = React.useState(null);
  const [last, setLast] = React.useState(null);
  const [close, setClose] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [clienteCurr, setClienteCurr] = React.useState('todos');
  const [roleID, _] = React.useState(getData('user').role_id);

  React.useEffect(() => {
    setLoading(true);

    if (roleID === 3) {
      Dashboard.MyClientesAtividades().then((Dados) => {
        setOpen(Dados.data.open);
        setHalf(Dados.data.half);
        setLast(Dados.data.last);
        setClose(Dados.data.close);
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        setLoading(false);
      })
    } else {
      Dashboard.AtividadesAll().then((Dados) => {
        setOpen(Dados.data.open);
        setHalf(Dados.data.half);
        setLast(Dados.data.last);
        setClose(Dados.data.close);
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        setLoading(false);
      })
    }

    return function cleanup() {
      setLoading(false);
      Service.default.cancel('MyAtividades unmonted');
    };

  }, []);

  const changeCliente = React.useCallback( async (event) => {
    setClienteCurr(event.target.value);
    setLoading(true);
    try {
      setLoading(false);
      let Dados = '';
      if (event.target.value === 'todos' && roleID === 3) {
        Dados = await Dashboard.MyClientesAtividades();
      } else if (event.target.value === 'todos' && roleID < 3) {
        Dados = await Dashboard.AtividadesAll();
      }else {
        Dados = await Dashboard.MyClienteAtividades(event.target.value);
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
