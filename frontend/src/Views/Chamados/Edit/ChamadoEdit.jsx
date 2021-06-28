import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  FormControl,
  IconButton
} from '@material-ui/core/';
import { Edit, Check, Chat } from '@material-ui/icons';
import {
  SelectAtribuidos,
  SelectRequerente,
  SelectClientsChamado,
  SelectCategorias,
  SelectSubCategorias
} from './Selects';
import { PaperHeader, MyPaper } from '../../../Components/Paper/Chamados';
import Prioridade from '../../../Components/Buttons/Prioridade';
import MenuStatus from '../../../Components/Menu/StatusChamado';
import { Save } from '../../../Components/Buttons/Chamados';
import { TimeChamado } from '../../../Components/ToolTip/TimeChamado';
import Loading from '../../../Components/Loading/';

//* PROVIDER
import useChamados from '../../../Context/ChamadosContext';
import useSnackBar from '../../../Context/SnackBarContext';

//* HOOKS
import useUser from '../../../Hooks/useUser';

//* SERVICES
import { getChamado } from '../../../Service/chamados.service';

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: '-6rem',
    '& .titulo': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      '& .MuiFormControl-root': {
        width: '80%',
        marginLeft: 10
      }
    },
    '& input': {
      fontSize: '1.25rem'
    }
  },
  prioridade_status: {
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    width: '100%'
  },
  input_selects: {
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10
  },
  input_descricao: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    padding: '10px 20px',
    '& .descricao': {
      width: '100%',
      '& .MuiOutlinedInput-multiline': {
        height: 200,
        '& textarea': {
          height: 180,
          fontSize: 14
        }
      }
    }
  },
  descricao: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 50,
    borderBottom: '1px solid ' + theme.palette.border.common,
    '& .grid': {
      paddingLeft: 20,
      display: 'flex',
      alignItems: 'center',
      '& span': {
        marginLeft: 20
      }
    },
    '& .icon': {
      color: theme.palette.button.accordion
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '10px 20px',
  }
}));

const Title = ({ id, titulo, setChamado, error }) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(titulo);

  const keyPress = useCallback((e) => {
    if (e.keyCode == 13) {
      setValue(value.trim());
      setChamado(chamado =>{
        return {
          ...chamado,
          titulo: value.trim()
        };
      })
      setEdit(false);
    }
  },[value]);

  const handleClick = useCallback(() => {
    setValue(value.trim());
    setChamado((chamado) => {
      return {
        ...chamado,
        titulo: value.trim()
      };
    });
    setEdit(false);
  },[value])

  return (
    <>
      {edit ? (
        <FormControl
          variant="standard"
          className="titulo"
          error={error ? true : false}
        >
          <Typography variant="h6" component="span">
            C-{id} #
          </Typography>
          <TextField
            id="titulo"
            name="titulo"
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={keyPress}
            value={value}
            error={error ? true : false}
            helperText={error}
            required
            autoFocus
          />
          <IconButton
            aria-label="delete"
            className={classes.button}
            size="small"
            onClick={handleClick}
          >
            <Check fontSize="inherit" />
          </IconButton>
        </FormControl>
      ) : (
        <div className="titulo">
          <Typography variant="h6" component="span" style={{width: '100%'}}>
            C-{id} # {value}
          </Typography>
          <IconButton
            aria-label="delete"
            className={classes.button}
            size="small"
              onClick={() => setEdit(!edit)}
              style={{marginRight: 10}}
          >
            <Edit fontSize="inherit" />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSnackBar } = useSnackBar();
  const { id } = useParams();
  const { userDados } = useUser();
  const { chamado, setChamado, errors } = useChamados();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chamado.status === 'Finalizado') {
      return history.replace(`/chamado/view/${chamado.id}`);
    }
  },[chamado.status])
  
  useEffect(() => {
    let render = true;
    (async () => {
      try {
        setLoading(true);
        let Dados = null;

        if (userDados && userDados.id) {
          Dados = await getChamado(id);
          if (Dados && Dados.success && render) {
            if (
              userDados.role_id !== 3 ||
              userDados.id === Dados.data.atribuido_id ||
              userDados.id === Dados.data.requerente_id
            ) {
              return setChamado(Dados.data);
            } else throw new Error('Sem permissão para editar a requisição.');
          }
        }
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: error.message || 'Erro em carrega chamado.'
        });
        return history.replace('/chamados');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      return false;
    };
  }, [userDados]);

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setChamado({
        ...chamado,
        [name]: value
      });
    },
    [chamado]
  );

  return (
    <>
      {!loading && userDados && chamado.id ? (
        <form autoComplete="off">
          <Grid container>
            <Grid item xs={7} className={classes.header}>
              <PaperHeader style={{ flexDirection: 'row' }}>
                <Title
                  id={chamado.id}
                  titulo={chamado.titulo}
                  setChamado={setChamado}
                  errors={errors['titulo']}
                />
              </PaperHeader>
            </Grid>
            <Grid item xs={3} className={classes.header}>
              <PaperHeader>
                <div className={classes.prioridade_status}>
                  <Prioridade type="chamado" />
                  <MenuStatus status={chamado.status} />
                </div>
              </PaperHeader>
            </Grid>
            <Grid item xs={2} className={classes.header}>
              <PaperHeader>
                <TimeChamado
                  created_at={chamado.created_at}
                  updated_at={chamado.updated_at}
                />
              </PaperHeader>
            </Grid>
            <MyPaper>
              <Grid item xs={4} className={classes.input_selects}>
                <SelectRequerente
                  varian="outlined"
                  handleChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4} className={classes.input_selects}>
                <SelectAtribuidos
                  varian="outlined"
                  handleChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4} className={classes.input_selects}>
                <SelectClientsChamado
                  varian="outlined"
                  handleChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </MyPaper>
            <MyPaper>
              <Grid item xs={6} className={classes.input_selects}>
                <SelectCategorias
                  varian="outlined"
                  handleChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6} className={classes.input_selects}>
                <SelectSubCategorias
                  varian="outlined"
                  handleChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </MyPaper>
            <MyPaper style={{ flexDirection: 'column', padding: 0 }}>
              <div className={classes.descricao}>
                <div className="grid">
                  <Chat className="icon" />
                  <Typography variant="h6" component="span">
                    Descrição do chamado
                  </Typography>
                </div>
              </div>
              <Grid item xs={12} md={12} className={classes.input_descricao}>
                <FormControl
                  variant="outlined"
                  className="descricao"
                  error={errors['descricao'] ? true : false}
                >
                  <TextField
                    id="descricao"
                    name="descricao"
                    multiline
                    rows={2}
                    variant="outlined"
                    onChange={handleChange}
                    value={chamado.descricao}
                    error={errors['descricao'] ? true : false}
                    helperText={errors['descricao']}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} className={classes.buttons}>
                <Save />
              </Grid>
            </MyPaper>
          </Grid>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};
