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
  getClientesByUser
} from '../../Service/user.service';

import {
  getAllCategorias,
  getSubCategoriasByCategoria
} from '../../Service/categorias.service';

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

export default ({
  title,
  handleChange,
  id,
  name,
  value,
  itens,
  errorText,
  variant,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled'}
      className={classes.formControl}
      error={errorText ? true : false}
    >
      <InputLabel id={id}>{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        value={value || ''}
        {...rest}
      >
        {itens.length >= 1 &&
          itens.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.nome}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectItem = ({
  title,
  handleChange,
  id,
  name,
  value,
  itens,
  errorText,
  variant,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled'}
      className={classes.selectitem}
      error={errorText ? true : false}
    >
      <InputLabel id={id}>{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        className="MuiFilledInput-input"
        value={value || ''}
        {...rest}
      >
        {itens.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectMeses = ({
  title,
  handleChange,
  id,
  name,
  value,
  itens,
  errorText,
  variant,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled'}
      className={classes.selectitem}
      error={errorText ? true : false}
    >
      <InputLabel id={id}>{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        className="MuiFilledInput-input"
        value={value || ''}
        {...rest}
      >
        {itens.map((item, index) => {
          return (
            <MenuItem key={item} value={index + 1}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectCommon = ({
  handleChange,
  title,
  name,
  value,
  itens,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Select
      label={title}
      onChange={handleChange}
      displayEmpty
      value={value}
      variant="filled"
      defaultValue="todos"
      className={classes.select}
      {...rest}
    >
      <MenuItem value="todos">Todos</MenuItem>
      {itens.length > 1 &&
        itens.map((item) => {
          return (
            <MenuItem
              style={{ paddingLeft: 10 }}
              key={item['id']}
              value={item['id']}
            >
              {item['nome_fantasia']}
            </MenuItem>
          );
        })}
    </Select>
  );
};

export const SelectRequerente = ({
  currUser,
  errorText,
  value,
  handleChange,
  ...rest
}) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let render = true;

    if (currUser.id) {
      (async () => {
        try {
          if (currUser.role_id === 3) {
            const { success, data } = await getPerfil();
            if (render && success)
              return setUsers((users) => users.concat(data));
          } else {
            const { success, data } = await getUsers();
            if (render && success) return setUsers(data);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }

    return () => {
      return false;
    };
  }, [currUser]);

  return (
    <>
      {users.length >= 1 && (
        <FormControl
          variant="outlined"
          className={classes.formControl}
          error={errorText ? true : false}
        >
          <InputLabel id="requerente">Técnico Requerente</InputLabel>
          <Select
            label="Técnico Requerente"
            onChange={handleChange}
            id="requerente"
            name="requerente_id"
            value={value || users[0].id}
            disabled={currUser.role_id === 3 ? true : false}
            {...rest}
          >
            {users.length >= 1 &&
              users.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.id}>
                    {user.nome}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};

export const SelectAtribuidos = ({
  requerente,
  currUser,
  errorText,
  value,
  handleChange,
  setChamado,
  ...rest
}) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let render = true;
    (async () => {
      try {
        setLoading(true);
        const { success, data } = await getUsersAtribuiveis(requerente);
        if (render && success) {

          if (data.length === 1) {
            setChamado(chamado => {
              return {
                ...chamado,
                'atribuido_id': data[0].id
              }
            });
          }

          return setUsers(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      return false;
    };
  }, [requerente]);

  const handleValue = () => {
    const t = users.filter((user) => user.id === value);
    return t.length >= 1 ? t[0].id : users[0].id
  };

  return (
    <>
      {requerente && value && users.length >= 1 && (
        <FormControl
          variant="outlined"
          className={classes.formControl}
          error={errorText ? true : false}
        >
          <InputLabel id="atribuido">Técnico Atribuído</InputLabel>
          <Select
            label="Técnico Atribuído"
            onChange={handleChange}
            id="atribuido"
            name="atribuido_id"
            value={handleValue()}
            disabled={loading || currUser.role_id === 3 ? true : false}
            {...rest}
          >
            {users.length >= 1 &&
              users.map((users) => {
                return (
                  <MenuItem key={users.id} value={users.id}>
                    {users.nome}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};

export const SelectClientsChamado = ({
  requerente,
  currUser,
  errorText,
  value,
  handleChange,
  setChamado,
  ...rest
}) => {
  const classes = useStyles();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let render = true;
    (async () => {
      try {
        setLoading(true);
        const { success, data } = await getClientesByUser(requerente);
        if (render && success) {

          if (data.length === 1) {
            setChamado((chamado) => {
              return {
                ...chamado,
                cliente_id: data[0].id
              };
            });
          }
          return setClientes(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      return false;
    };
  }, [requerente]);

  const handleValue = () => {
    const t = clientes.filter((cliente) => cliente.id === value);
    return t.length >= 1 ? t[0].id : clientes[0].id;
  };

  return (
    <>
      {requerente && value && clientes.length >= 1 && (
        <FormControl
          variant="outlined"
          className={classes.formControl}
          error={errorText ? true : false}
        >
          <InputLabel id="cliente_id">Cliente</InputLabel>
          <Select
            label="Cliente"
            onChange={handleChange}
            id="cliente_id"
            name="cliente_id"
            value={handleValue()}
            disabled={loading || clientes.length > 1 ? false : true}
            {...rest}
          >
            {clientes.length >= 1 &&
              clientes.map((cliente) => {
                return (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome_fantasia}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};


export const SelectCategorias = ({
  currUser,
  errorText,
  value,
  handleChange,
  ...rest
}) => {
  const classes = useStyles();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    let render = true;
    (async () => {
      try {
        const { success, data } = await getAllCategorias();
        if (render && success) {
          setCategorias(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      return false;
    };
  }, []);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errorText ? true : false}
    >
      <InputLabel id="categoria">Categoria</InputLabel>
      <Select
        label="Categoria"
        onChange={handleChange}
        id="categoria"
        name="categoria_id"
        value={value || ''}
        {...rest}
      >
        {categorias.length >= 1 &&
          categorias.map((categoria) => {
            return (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};


export const SelectSubCategorias = ({
  categoria,
  currUser,
  errorText,
  value,
  handleChange,
  setChamado,
  ...rest
}) => {
  const classes = useStyles();
  const [subCategorias, setSubCategorias] = useState([]);

  useEffect(() => {
    let render = true;
    (async () => {
      try {
        const { success, data } = await getSubCategoriasByCategoria(categoria);
        if (render && success) {
          if (data.length >= 1) {
            setChamado((chamado) => {
              return {
                ...chamado,
                sub_categoria_id: data[0].id
              };
            });
          }
          return setSubCategorias(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      return false;
    };
  }, [categoria]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errorText ? true : false}
    >
      <InputLabel id="sub_categoria">Sub-Categorias</InputLabel>
      <Select
        label="Sub-Categorias"
        onChange={handleChange}
        id="sub_categoria_id"
        name="sub_categoria_id"
        value={value || ''}
        {...rest}
      >
        {subCategorias.length >= 1 &&
          subCategorias.map((sub) => {
            return (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.nome}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};