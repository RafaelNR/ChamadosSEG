import React from "react";
import {  makeStyles, Paper, TextField, Grid, Select, FormControl, InputLabel, MenuItem, FormHelperText} from "@material-ui/core/";
import { SaveSharp } from "@material-ui/icons";
import Progress from '../Buttons/Progress'
import { EditInfoAtividade } from '../Buttons/Index'

import Accordion from '../Accordion/Accordion';

//* Service
import { getAllCategorias } from '../../Service/categorias.service';
import { InsertInfo, UpdateInfo } from '../../Service/atividade.service';

import useSnackBar from "../../Context/SnackBarContext";

const useStyles = makeStyles((theme) => ({
  'form': {
    width: '100%',
  },
  boxgrid:{
    margin: theme.spacing(1),
    width: 'calc(100% + -16px)',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  input: {
    padding: '8px 0px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150
  },
  info: {
    padding: '10px',
    width: 'calc(100vw - 605px)',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '10px',
  },
}));

export default ({ ticket, atividadeID, newInfo }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [categorias, setCategorias] = React.useState([]);
  const [info, setInfo ] = React.useState([]);
  const [errors, setErrors] = React.useState(true);
  const [loading, setLoading] = React.useState(false); //! false
  const [success, setSuccess] = React.useState(false); //! false
  const [type, setType] = React.useState('insert');
  
  React.useEffect( () => {

    getAllCategorias().then(Dados => {
      
      if (Dados.success) {
        setCategorias(Dados.data)
        setInfo({
          atividade_id: atividadeID,
          ticket: ticket,
        });
      }
    }).catch(err => {
      handleSnackBar({
        type: "error",
        message: err.message,
      });
    })
  },[]);

  function handleInfo(e) {
    const key = e.target.name;
    setInfo({
      ...info,
      [key]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!loading) {
      setSuccess(true);
      setLoading(true);

      if (type === 'insert') {
        await handleInsert();
      } else {
        await handleUpdate();
      }

    }
  }

  async function handleInsert() {

    InsertInfo(info).then((Dados) => {

      if (Dados.error) {
        setSuccess(false);
        setLoading(false);
        return setErrors(Dados.errors)
      }
    
      setSuccess(true);
      setLoading(false);
      setInfo({
        ...info,
        ...Dados
      })
      newInfo();
      window.scrollTo({ top: 60000, behavior: 'smooth' })
      return setErrors([])

    }).catch(err => {
      setSuccess(false);
      setLoading(false);
      handleSnackBar({
        type: "error",
        message: 'Erro em inserir informação da atividade.',
      });
    })
    
  }

  async function handleUpdate() {

    UpdateInfo(info).then((Dados) => {

      if (Dados && Dados.error) {
        setSuccess(false);
        setLoading(false);
        return setErrors(Dados.errors)
      }
    
      setSuccess(true);
      setLoading(false);
      setInfo({
        ...info,
        ...Dados
      })
      return setErrors([])
    }).catch(err => {
      console.log(err)
      setSuccess(false);
      setLoading(false);
      handleSnackBar({
        type: "error",
        message: 'Erro fazer o update informação da atividade.',
      });
    })
    
  }

  function handleEdit() {
    setSuccess(false);
    setType('Update');
  }

  return (
    <Accordion info={success ? info : null}>
      <form onSubmit={handleSubmit} autoComplete="off" >
          <Grid container spacing={2} className={classes.boxgrid}
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
          >
          <Grid item className={classes.input}> 
            <FormControl variant="outlined" className={classes.formControl} disabled={success} error={errors['categorias_id'] ? true : false}>
              <InputLabel id="categoria">Categorias *</InputLabel>
              <Select
                autoFocus
                labelId="categoria_id"
                id="categoria_id"
                name="categoria_id"
                onChange={handleInfo}
                label="Categorias"
                required
                error={errors['categoria_id'] ? true : false}
                helperText={errors['categoria_id']}
              >
                { categorias && categorias.map((categoria) => {
                  return <MenuItem key={categorias.id} value={categoria.id} selected>{categoria.nome}</MenuItem>
                }) } 
              </Select>
              <FormHelperText>{errors['categoria_id']}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item className={classes.input}> 
            <FormControl variant="outlined" className={classes.info} disabled={success} error={errors['info'] ? true : false}>
              <TextField
                id="descricao"
                name="descricao"
                label="Descrição da atividade"
                multiline
                rows={2}
                variant="outlined"
                error={errors['descricao'] ? true : false}
                helperText={errors['descricao']}
                onChange={handleInfo}
                disabled={success}
                required
              />
            </FormControl>
          </Grid>
          <Grid item style={{ padding: '0px' }} className={classes.buttons}>
            <Progress 
              handleSubmit={handleSubmit}
              loading={loading}
              success={success}
            >
             <SaveSharp />
            </Progress>

            {
              success && 
              <EditInfoAtividade handleEdit={handleEdit}/>
            }
          </Grid>
        </Grid>
      </form>
    </Accordion>
  );
}

