import React, { useState, useEffect, useCallback } from 'react';
import {
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

//* SERVICE
import { getModelos } from '../../../Service/modelosChamados.service'

//* CONTEXT
import useChamados from '../../../Context/ChamadosContext';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 5
  },
  formControl: {
    width: '100%'
  }
});


export default () => {
  const classes = useStyles();
  const { currModelo, setCurrModelo, setChamado } = useChamados();
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    let render = true;

    (async () => {
      try {
        const { success, data } = await getModelos();
        if (success && render) {
          setModelos(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      return false;
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = useCallback((e) => {
    const id = e.target.value;
    const Modelo = modelos.filter((modelo) => modelo.id === id)[0];

    if (Modelo) {
      setCurrModelo(id);
      setChamado((chamado) => {
        return {
          ...chamado,
          titulo: Modelo.titulo,
          descricao: Modelo.descricao,
          categoria_id: Modelo.categoria_id,
          sub_categoria_id: Modelo.sub_categoria_id,
          modelo: true,
        };
      });
    }

    // eslint-disable-next-line
  }, [modelos]);

  return (
    <Paper className={classes.root} elevation={0}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="modelos">Selecione o Modelo</InputLabel>
        <Select
          label="Selecione o Modelo"
          onChange={handleChange}
          id="modelo"
          name="modelo"
          value={currModelo || ''}
        >
          {modelos.length >= 1 &&
            modelos.map((modelo) => {
              return (
                <MenuItem key={modelo.id} value={modelo.id}>
                  {modelo.titulo}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Paper>
  );
};
