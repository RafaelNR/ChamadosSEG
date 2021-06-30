import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

import {
  getAllCategorias,
  getSubCategoriasByCategoria
} from '../../Service/categorias.service';

//* CONTEXT
import useModelos from '../../Context/ModelosChamadoContext';

const useStyles = makeStyles({
  formControl: {
    //marginTop: 15,
    width: '100%',
    '& > label': {
      fontSize: '1rem'
    },
    '& .MuiInputBase-root': {
      padding: '1px'
    }
  },
  selectitem: {
    width: '80%'
  },
  select: {
    width: 200,
    marginRight: '2%',
    '& .MuiFilledInput-input': {
      padding: '15px 10px'
    }
  }
});

export const SelectCategorias = () => {
  const classes = useStyles();
  const { modelo, errors, handleChange } = useModelos();
  const [values, setValues] = useState([]);

  useEffect(() => {
    let render = true;
    
    (async () => {
      try {
        const { success, data } = await getAllCategorias();
        if (render && success) {
          return setValues(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    

    return function cleanup(){
      return false;
    };
  }, [modelo]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['categoria_id'] ? true : false}
    >
      <InputLabel id="categoria_id">Categorias *</InputLabel>
      <Select
        label="Categorias *"
        onChange={handleChange}
        id="categoria_id"
        name="categoria_id"
        value={modelo.categoria_id || ''}
        varian="outlined"
        fullWidth
        required
      >
        {values.length >= 1 &&
          values.map((value) => {
            return (
              <MenuItem key={value.id} value={value.id}>
                {value.nome}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errors['categoria_id'] || ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectSubCategorias = () => {
  const classes = useStyles();
  const { modelo, errors, handleChange } = useModelos();
  const [values, setValues] = useState([]);

  useEffect(() => {
    let render = true;

    if (modelo && modelo.categoria_id) {
      (async () => {
        try {
          const { success, data } = await getSubCategoriasByCategoria(
            modelo.categoria_id
          );

          if (render && success) {
            return setValues(data);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  
    return () => {
      return false;
    };
  }, [modelo.categoria_id]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['sub_categoria_id'] ? true : false}
    >
      <InputLabel id="sub_categoria_id">Sub-Categorias *</InputLabel>
      <Select
        label="Sub-Categorias *"
        onChange={handleChange}
        id="sub_categoria_id"
        name="sub_categoria_id"
        value={modelo.sub_categoria_id || ''}
        varian="outlined"
        fullWidth
        required
      >
        {values.length >= 1 &&
          values.map((value) => {
            return (
              <MenuItem key={value.id} value={value.id}>
                {value.nome}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errors['sub_categoria_id'] || ''}</FormHelperText>
    </FormControl>
  );
};