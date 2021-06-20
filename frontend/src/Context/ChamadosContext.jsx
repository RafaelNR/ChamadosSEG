import React, { createContext, useState, useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

//* SERVICE
import * as Service from '../Service/chamados.service';

//** CONTEXT
import useSnackBar from './SnackBarContext';
import useLoading from './LoadingContext';

//** VALIDATION
import { UpdateSchema, InsertSchema } from '../Schemas/Chamados.Schema';

const ChamadosContext = createContext({});

const ChamadosProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const history = useHistory();
  const [chamados, setChamados] = useState([]);
  const [chamado, setChamado] = useState({});
  const [currTab, setCurrTab] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setCurrTab(parseInt(localStorage.getItem('currTabChamado')));
  },[])

  const changeCurrTab = useCallback(async (e,newValue) => {
    setCurrTab(newValue);
    localStorage.setItem('currTabChamado', newValue);
  },[])

  const changePrioridadeChamados = useCallback(async (id, prioridade) => {
    const newPrioridade = !prioridade ? 1 : 0;
    const Dados = await Service.changePrioridade(id, newPrioridade);
    if (Dados.success) {
      const newChamados = chamados.map((chamado) => {
        if (chamado.id === id) {
          return {
            ...chamado,
            prioridade: newPrioridade
          }
        }
        return chamado
      });
      setChamados(newChamados);
    }
  }, [])

  const changePrioridadeChamado = useCallback(async (id, prioridade) => {
    const newPrioridade = !prioridade ? 1 : 0;
    const Dados = await Service.changePrioridade(id, newPrioridade);
    setChamado({
      ...chamado,
      prioridade: newPrioridade
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    chamado.id ? await handleUpdate(chamado) : await handleInsert(chamado);
  }, [chamado]);

  const handleInsert = useCallback(async () => {
    try {
      setLoading(true);

      console.log(chamado)

      const newChamado = await InsertSchema(chamado);

      console.log(newChamado)

      if (newChamado.error) throw newChamado;

      const Dados = await Service.Insert(newChamado);
      const { success, data } = Dados;
      if (success) {
        setChamado(data);
        setErrors([])
        handleSnackBar({
          type: 'success',
          message: 'Chamado Inserido.'
        });
        return history.replace(`/chamado/edit/${data[0]}`);
      }
      throw new Error(data.message);
    } catch (error) {
      console.log(error);
      if (error && error.errors) setErrors(error.errors);
      handleSnackBar({
        type: 'error',
        message:
          error && error.message
            ? error.message
            : 'Erro em inserir o chamado.'
      });
    } finally {
      setLoading(false);
    }
  }, [chamado]);
  
  const handleUpdate = useCallback(async () => {
    try {
      setLoading(true);

      const newChamado = await UpdateSchema(chamado);

      if (newChamado.error) throw newChamado;

      const Dados = await Service.Update(newChamado);
      const { success, data } = Dados;
      if (success) {
        setChamado(data);
        setErrors([]);
        return handleSnackBar({
          type: 'success',
          message: 'Chamado Atualizado.'
        });
      }
      throw new Error(data.message);
    } catch (error) {
      console.log(error);
      if (error && error.errors) setErrors(error.errors);
      handleSnackBar({
        type: 'error',
        message:
          error && error.message
            ? error.message
            : 'Erro em atualizar chamado.'
      });
    } finally {
      setLoading(false);
    }
  }, [chamado]);
  
  return (
    <ChamadosContext.Provider
      value={{
        currTab,
        setCurrTab,
        chamado,
        setChamado,
        chamados,
        errors,
        setErrors,
        setChamados,
        changeCurrTab,
        changePrioridadeChamado,
        changePrioridadeChamados,
        handleSubmit,
      }}
    >
      {children}
    </ChamadosContext.Provider>
  );
};

ChamadosProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default () => {
  return useContext(ChamadosContext);
}

export { ChamadosContext, ChamadosProvider };



