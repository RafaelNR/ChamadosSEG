import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

//* SERVICE
import {
  getUsers,
  getPerfil,
  getUsersAtribuiveis,
} from '../../../Service/user.service';

import { getClientesByUsuario } from '../../../Service/clientes.service';

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


export const SelectRequerente = ({
  handleChange,
  ...rest
}) => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { chamado, errors } = useChamados();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let render = true;

    if (userDados.id && userDados.role_id) {
      (async () => {
        try {
          if (userDados.role_id === 3) {
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
  }, [userDados]);

  return (
    <>
      {users.length >= 1 && (
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
            name="requerente_id"
            value={chamado.requerente_id || users[0].id}
            disabled={userDados.role_id === 3 ? true : false}
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
          <FormHelperText>{errors['requerente'] || ''}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};

export const SelectAtribuidos = ({
  handleChange,
  ...rest
}) => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { chamado, setChamado, errors } = useChamados();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let render = true;

    if (userDados.role_id) {
      (async () => {
        try {
          setLoading(true);
          
          const { success, data } =
            userDados.role_id === 3
              ? await getUsersAtribuiveis(chamado.requerente_id)
              : await getUsers();

          if (render && success) {
            if (data.length === 1) {
              setChamado((chamado) => {
                return {
                  ...chamado,
                  atribuido_id: data[0].id
                };
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
    }

    return () => {
      return false;
    };
  }, [userDados.role_id, chamado.requerente_id]);

  const handleValue = () => {
    const t = users.filter((user) => user.id === chamado.atribuido_id);
    return t.length >= 1 ? t[0].id : users[0].id
  };

  return (
    <>
      {chamado.atribuido_id && users.length >= 1 && (
        <FormControl
          variant="outlined"
          className={classes.formControl}
          error={errors['atribuido'] ? true : false}
        >
          <InputLabel id="atribuido">Atribuído Para</InputLabel>
          <Select
            label="Atribuído Para"
            onChange={handleChange}
            id="atribuido"
            name="atribuido_id"
            value={handleValue()}
            disabled={loading || userDados.role_id === 3 ? true : false}
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
          <FormHelperText>{errors['atribuido'] || ''}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};

export const SelectClientsChamado = ({
  handleChange,
  ...rest
}) => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { chamado, setChamado, errors } = useChamados();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let render = true;

    if (userDados.role_id) {
      (async () => {
        try {
          setLoading(true);
          const { success, data } =
            userDados.role_id === 3
              ? await getClientesByUsuario(chamado.requerente_id)
              : await getClientesByUsuario(chamado.atribuido_id);

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
    }

    return () => {
      return false;
    };
  }, [userDados.role_id,chamado.requerente_id, chamado.atribuido_id]);

  const handleValue = () => {
    const t = clientes.filter((cliente) => cliente.id === chamado.cliente_id);
    return t.length >= 1 ? t[0].id : clientes[0].id;
  };

  return (
    <>
      {chamado.requerente_id && clientes.length >= 1 && (
        <FormControl
          variant="outlined"
          className={classes.formControl}
          error={errors['cliente'] ? true : false}
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
          <FormHelperText>
            {errors['cliente_id'] || ''}
          </FormHelperText>
        </FormControl>
      )}
    </>
  );
};


export const SelectCategorias = ({
  handleChange,
  ...rest
}) => {
  const classes = useStyles();
  const { chamado, errors } = useChamados();
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
      error={errors['categoria'] ? true : false}
    >
      <InputLabel id="categoria">Categoria</InputLabel>
      <Select
        label="Categoria"
        onChange={handleChange}
        id="categoria"
        name="categoria_id"
        value={chamado.categoria_id || ''}
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
      <FormHelperText>{errors['categoria'] || ''}</FormHelperText>
    </FormControl>
  );
};


export const SelectSubCategorias = ({
  handleChange,
  ...rest
}) => {
  const classes = useStyles();
  const { chamado, setChamado, errors } = useChamados();
  const [subCategorias, setSubCategorias] = useState([]);

  useEffect(() => {
    let render = true;
    (async () => {
      try {
        const { success, data } = await getSubCategoriasByCategoria(
          chamado.categoria_id
        );
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
  }, [chamado.categoria_id]);

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errors['sub_categoria'] ? true : false}
    >
      <InputLabel id="sub_categoria">Sub-Categorias</InputLabel>
      <Select
        label="Sub-Categorias"
        onChange={handleChange}
        id="sub_categoria_id"
        name="sub_categoria_id"
        value={chamado.sub_categoria_id || ''}
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
      <FormHelperText>
        {errors['sub_categoria'] || ''}
      </FormHelperText>
    </FormControl>
  );
};