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
  getUsers,
  getPerfil,
  getUsersAtribuiveis,
  getClientesByUser,
} from '../../../Service/user.service';

import {
  getAllCategorias,
  getSubCategoriasByCategoria
} from '../../../Service/categorias.service';

//* CONTEXT
import useChamados from '../../../Context/ChamadosContext';

//* HOOKS
import useUser from '../../../Hooks/useUser';

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

export const SelectRequerentes = ({ handleChange, ...rest }) => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { errors, chamado, setChamado } = useChamados();
  const [values, setValues] = useState([]);

  useEffect(() => {
    let render = true;

    if (userDados.id) {
      (async () => {
        try {
          const { success, data } =
            userDados.role_id === 3 ? await getPerfil() : await getUsers();

          if (success && render) {
            if (!data.length) {
              setValues(values.concat(data));
              setChamado({
                ...chamado,
                requerente: data.id
              });
            } else {
              setValues(data);
              setChamado({
                ...chamado,
                requerente: userDados.id
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }

    return () => {
      return false;
    };
    // eslint-disable-next-line
  }, [userDados]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['requerente'] ? true : false}
    >
      <InputLabel id="requerente">Requerente</InputLabel>
      <Select
        label="Requerente"
        onChange={handleChange}
        id="requerente"
        name="requerente"
        value={chamado.requerente || ''}
        disabled={values.length === 1 ? true : false}
        {...rest}
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
      <FormHelperText>{errors['requerente'] || ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectAtribuiveis = ({ handleChange, ...rest }) => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { errors, chamado } = useChamados();
  const [values, setValues] = useState([]);

  useEffect(() => {
    let render = true;

    if (userDados.id && chamado.requerente) {
      (async () => {
        try {
          const { success, data } =
            userDados.role_id === 3
              ? await getUsersAtribuiveis(chamado.requerente)
              : userDados.id === chamado.requerente
              ? await getUsers()
              : await getUsersAtribuiveis(chamado.requerente);

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
    // eslint-disable-next-line
  }, [chamado.requerente]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['atribuido'] ? true : false}
    >
      <InputLabel id="atribuido">Atribuir para</InputLabel>
      <Select
        label="Atribuir para"
        onChange={handleChange}
        id="atribuido"
        name="atribuido"
        value={chamado.atribuido || ''}
        disabled={values.length === 1 ? true : false}
        {...rest}
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
      <FormHelperText>{errors['atribuido'] || ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectClientes = ({ handleChange, ...rest }) => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { errors, chamado, setChamado } = useChamados();
  const [values, setValues] = useState([]);

  useEffect(() => {
    let render = true;
    if (chamado.requerente && chamado.atribuido) {
      (async () => {
        try {
          const { success, data } =
            userDados.role_id !== 3
              ? await getClientesByUser(chamado.atribuido)
              : await getClientesByUser(chamado.requerente);

          if (render && success) {
            setChamado((chamado) => {
              return {
                ...chamado,
                cliente_id: data[0].id
              };
            });
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
  }, [chamado.requerente, chamado.atribuido]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['cliente_id'] ? true : false}
    >
      <InputLabel id="cliente">Cliente</InputLabel>
      <Select
        label="cliente"
        onChange={handleChange}
        id="cliente_id"
        name="cliente_id"
        value={chamado.cliente_id || ''}
        disabled={
          values.length === 1
            ? true
            : false || chamado.atribuido && chamado.requerente ? false : true
        }
        {...rest}
      >
        {values.length >= 1 &&
          values.map((value) => {
            return (
              <MenuItem key={value.id} value={value.id}>
                {value.nome_fantasia}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errors['cliente_id'] || ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectCategorias = ({ handleChange, ...rest }) => {
  const classes = useStyles();
  const { errors, chamado } = useChamados();
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
    

    return () => {
      return false;
    };
  }, [chamado.requerente]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['categoria_id'] ? true : false}
    >
      <InputLabel id="categoria_id">Categorias</InputLabel>
      <Select
        label="categoria_id"
        onChange={handleChange}
        id="categoria_id"
        name="categoria_id"
        value={chamado.categoria_id || ''}
        {...rest}
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

export const SelectSubCategorias = ({ handleChange, ...rest }) => {
  const classes = useStyles();
  const { errors, chamado } = useChamados();
  const [values, setValues] = useState([]);

  useEffect(() => {
    let render = true;

    if (chamado.categoria_id) {
      (async () => {
        try {
          const { success, data } = await getSubCategoriasByCategoria(
            chamado.categoria_id
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
  }, [chamado.categoria_id]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['sub_categoria_id'] ? true : false}
    >
      <InputLabel id="sub_categoria_id">Sub-Categorias</InputLabel>
      <Select
        label="sub_categoria_id"
        onChange={handleChange}
        id="sub_categoria_id"
        name="sub_categoria_id"
        value={chamado.sub_categoria_id || ''}
        {...rest}
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