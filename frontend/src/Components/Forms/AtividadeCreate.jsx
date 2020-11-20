import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid, Select, FormControl, InputLabel, MenuItem, FormHelperText, Typography } from "@material-ui/core/";
import Progress from '../../Components/Buttons/Progress'
import { Atividade, AtividadeCliente } from '../Box/Atividade'

//* Service
import { getMyClientes } from '../../Service/user.service';
import { Insert } from '../../Service/atividade.service';

//* Utils
import { TodayDate, handleDateTime } from '../../Utils/dates';

import useSnackBar from "../../Context/SnackBarContext";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: "-6rem",
  },
  boxgrid:{
    margin: theme.spacing(1),
    width: 'calc(100% + -16px)',
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 250,
  },
  errors:{
    marginTop: '30px'
  },
  gridCliente:{
    width: '600px',
    height: '160px',
  },
  notCliente: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#aaa !important'
  },
  paperCliente: {
    padding: '15px 28px',
    border: '1px solid #d9d9d9',
    margin: '10px',
    '& > p': {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#404040',
      '& > span': {
        fontSize: '13px',
        fontWeight: 'normal',
      },
    },
    '& > .title': {
        paddingBottom: '9px',
        color: '#3f51b5 !important'
    },
  },
  title:{
    fontSize: '25px',
    padding: '10px',
    color: '#3f51b5'
  },
  button:{
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
    marginBottom: '10px',
  }
}));

export default ({ setTicket, setAtividadeID, newInfo }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [clientes, setClientes] = React.useState([]);
  const [atividade, setAtividade] = React.useState({});
  const [errors, setErrors] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect( () => {
    getMyClientes().then(Dados => {
      if (Dados.success) {
        setClientes(Dados.data)
      }
    }).catch(err => {
      handleSnackBar({
        type: "error",
        message: err.message,
      });
    })
  }, []);

  React.useEffect(() => {
    setAtividade({
      date: TodayDate(),
      cliente_id: clientes.length === 1 ? clientes[0].id : ''
    })
  }, [clientes]);

  function handleAtividade(e) {
    const key = e.target.name;
    setAtividade({
      ...atividade,
      [key]: e.target.value,
    });

    setErrors({
      ...errors,
      [key]: null
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!loading) {
      setSuccess(false);
      setLoading(true);

      Insert(atividade).then(Dados => {

        if (Dados.error) {
          setSuccess(false);
          setLoading(false);
          return setErrors(Dados.errors)
        }

        setSuccess(true);
        setLoading(false);
        setAtividade({
          ...Dados,
          ...atividade,
        });
        setTicket(Dados.ticket);
        setAtividadeID(Dados.id);
        newInfo();
        window.scrollTo({ top: 60000, behavior: 'smooth' })
        return setErrors([])
        
      }).catch(error => {
        setSuccess(false);
        setLoading(false);
        handleSnackBar({
          type: "error",
          message: error.message ? error.message : 'Erro em inserir atividade.',
        });
      })
    }


  }
  
  return (
    <form onSubmit={handleSubmit} autoComplete="off" >
      <Paper className={classes.root}>

        <Typography className={classes.title}>
          Dados da Atividade
        </Typography>

        {/* CONTAINER */ }
        <Grid container md={12} spacing={2} className={classes.boxgrid}>
          <Grid item className={classes.input}>
            <FormControl variant="outlined" disabled={success} className={classes.formControl} >
            <TextField
              id="date"
              name="date"
              label="Data da atividade"
              type="date"
              value={atividade.date}
              onChange={handleAtividade}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={errors['date'] ? true : false}
              helperText={errors['date']}
              disabled={success}  
              required
            />
            </FormControl>
          </Grid>
          <Grid item className={classes.input}> 
            <FormControl variant="outlined" className={classes.formControl} disabled={success} error={errors['cliente_id'] ? true : false}>
              <InputLabel id="cliente">{clientes.length === 1 ? clientes[0].nome_fantasia : 'Clientes *'}</InputLabel>
              <Select
                labelId="cliente"
                id="cliente_id"
                name="cliente_id"
                onChange={handleAtividade}
                label="Clientes *"
                required
                disabled={clientes.length === 1 || success ? true : false}
              >
                { clientes && clientes.length > 0 && clientes.map((cliente) => {
                  return <MenuItem key={cliente.id} value={cliente.id}>{cliente.nome_fantasia}</MenuItem>
                }) } 
              </Select>
              <FormHelperText>{errors['cliente_id']}</FormHelperText>
            </FormControl>
            </Grid>
        </Grid>
        

        <Grid container md={12} spacing={2} className={classes.boxgrid}>
          
          <AtividadeCliente Atividade={atividade} Clientes={clientes} />
          <Atividade Atividade={atividade} />
  
        </Grid>


        <Grid container md={12} spacing={2} className={classes.boxgrid}>
          <Grid item md={12} className={classes.button}>
            <Progress 
              handleSubmit={handleSubmit}
              loading={loading}
              success={success}
            >
              Iniciar registros
            </Progress>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
