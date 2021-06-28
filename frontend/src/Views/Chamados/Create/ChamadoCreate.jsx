import React, { useEffect, useState, useCallback } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  FormControl,
  IconButton
} from '@material-ui/core/';
import { Chat } from '@material-ui/icons';
import {
  SelectRequerentes,
  SelectAtribuiveis,
  SelectClientes,
  SelectCategorias,
  SelectSubCategorias
} from './Selects';
import { PaperHeader, MyPaper } from '../../../Components/Paper/Chamados';
import Prioridade from '../../../Components/Buttons/Prioridade';
import MenuStatus from '../../../Components/Menu/StatusChamado';
import { Save } from '../../../Components/Buttons/Chamados';
import Loading from '../../../Components/Loading/';
import Modelos from './Modelos'

//* PROVIDER
import useChamados from '../../../Context/ChamadosContext';

//* HOOKS
import useUser from '../../../Hooks/useUser';


const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: '-6rem',
    '& .titulo': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      '& .MuiFormControl-root': {
        width: '100%',
        marginRight: 15
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

const Title = ({ handleChange, value, error }) => {
  const classes = useStyles();
  const { chamado } = useChamados();
  return (
    <FormControl
      variant="outlined"
      className="titulo"
      error={error ? true : false}
    >
      <TextField
        id="titulo"
        name="titulo"
        label="Titulo"
        variant="outlined"
        onChange={handleChange}
        value={chamado.titulo || ''}
        error={error ? true : false}
        helperText={error}
        required
        autoFocus
      />
    </FormControl>
  );
};

export default () => {
  const classes = useStyles();
  const { chamado, setChamado, errors } = useChamados();

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
      <form autoComplete="off">
        <Grid container>
          <Grid item xs={3} className={classes.header}>
              <Modelos />
          </Grid>
          <Grid item xs={9} className={classes.header}>
            <PaperHeader style={{ flexDirection: 'row' }}>
              <Title
                handleChange={handleChange}
                value={chamado.titulo}
                error={errors['titulo']}
              />
            </PaperHeader>
          </Grid>
          <MyPaper>
            <Grid item xs={4} className={classes.input_selects}>
              <SelectRequerentes
                varian="outlined"
                handleChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4} className={classes.input_selects}>
              <SelectAtribuiveis
                varian="outlined"
                handleChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4} className={classes.input_selects}>
              <SelectClientes
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
    </>
  );
};
