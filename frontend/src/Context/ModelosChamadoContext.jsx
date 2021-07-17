import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect
} from 'react';
import PropTypes from 'prop-types';

//** CONTEXT
import useSnackBar from './SnackBarContext';
import useLoading from './LoadingContext';

//** SERVICE
import * as Service from '../Service/modelosChamados.service';

//** SCHEMAS
import { UpdateSchema, InsertSchema } from '../Schemas/ModelosChamado.Schema';

const ModelosChamadoContext = createContext({});

const ModelosChamadoProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const [errors, setErrors] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [modelo, setModelo] = useState({});
  

  useEffect(() => {
    let render = true;
    setLoading(true);

    (async () => {
      try {
        const { success, data } = await Service.getModelosAll();
        if (success && render) return setModelos(data);
        throw new Error(data.message);
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : 'Erro em carregar modelos, por favor tente mais tarde.'
        });
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      render = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = React.useCallback((event) => {
    const name = event.target.name;
    const value = event.target.value;
    setModelo((props) => {
      return {
        ...props,
        [name]: value
      };
    });
  }, []);

  const Actions = {
    async insert() {
      try {
        const Dados = await InsertSchema(modelo);
        if (Dados.errors) throw Dados;

        const { success, data } = await Service.Insert(Dados);

        if (success) {
          setErrors([]);
          setModelos([...modelos, data]);
          handleSnackBar({
            type: 'success',
            message: 'Modelo Inserido.'
          });
          return true;
        }

        throw new Error(data.message);
      } catch (error) {
        if (error && error.errors) return setErrors(error.errors);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message ? error.message : 'Erro em inserir o modelo.'
        });
      }
    },
    async update() {
      try {
        const Dados = await UpdateSchema(modelo);

        if (Dados.errors) throw Dados;
        const { success, data } = await Service.Update(Dados);

        if (success) {
          setErrors([]);

          const newModelos = modelos.map((mod) => {
            if (mod.id === data.id) {
              return data;
            } else {
              return mod;
            }
          });

          setModelos(newModelos);
          handleSnackBar({
            type: 'success',
            message: 'Modelo Atualizado.'
          });
          return true;
        }

        throw new Error(data.message);
      } catch (error) {
        if (error && error.errors) return setErrors(error.errors);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message ? error.message : 'Erro em alterar o modelo.'
        });
      }
    },
    async delete() {
      try {
        const { success, data } = await Service.Deletar(modelo.id);

        if (success) {
          setErrors([]);
          const newModelos = modelos.filter((mod) => mod.id !== modelo.id);
          setModelos(newModelos);
          setModelo({})
          handleSnackBar({
            type: 'success',
            message: 'Modelo excluíudo.'
          });
          return true;
        }

        throw new Error(data.message);
      } catch (error) {
        if (error && error.errors) return setErrors(error.errors);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message ? error.message : 'Erro em excluir o modelo.'
        });
      }
    }
  };

  const handleActions = useCallback(
    (type) => {
      const fn = Actions[type];
      return fn();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modelo]
  );

  return (
    <ModelosChamadoContext.Provider
      value={{
        modelo,
        setModelo,
        modelos,
        setModelos,
        errors,
        setErrors,
        handleChange,
        handleActions
      }}
    >
      {children}
    </ModelosChamadoContext.Provider>
  );
};

ModelosChamadoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default () => {
  return useContext(ModelosChamadoContext);
};

export { ModelosChamadoContext, ModelosChamadoProvider };
