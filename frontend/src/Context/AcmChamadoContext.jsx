import React, { createContext, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

//* SERVICE
import * as Service from '../Service/chamados.service';

//** CONTEXT
import useSnackBar from './SnackBarContext';

//** VALIDATION
import {
  InsertAcompanhamentoSchema,
  UpdateAcompanhamentoSchema
} from '../Schemas/Chamados.Schema';

const AcompanhamentosChamadoContext = createContext({});

const AcompanhamentosChamadoProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const [acompanhamentos, setAcompanhamentos] = useState([]);
  const [acompanhamento, setAcompanhamento] = useState({});
  const [tipo, setTipo] = useState(0);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currID, setCurrID] = useState(null);

  const handleChange = useCallback(
    (e) => {
      e.persist();
      setAcompanhamento({
        ...acompanhamento,
        descricao: e.target.value
      });
    },
    [acompanhamento]
  );

  const InsertAcompanhamento = useCallback(async () => {
    try {
      setLoading(true);
      const acm = await InsertAcompanhamentoSchema(acompanhamento);

      if (acm.error) {
        console.log(acm.errors)
        throw new Error('Erro em inserir acompanhamento. '+acm.errors.descricao);
      }

      const { success, data } = await Service.InsertAcm(acm);
      if (success) {
        handleSnackBar({
          type: 'success',
          message: 'Acompanhamento adicionado.'
        });
        return setAcompanhamentos([
          data,
          ...acompanhamentos
        ])
      }
      throw new Error(data.message);
    } catch (error) {
      console.log(error);
      handleSnackBar({
        type: 'error',
        message:
          error && error.message ||
          'Erro em inserir acompanhamento no chamado.'
      });
    } finally {
      setLoading(false);
      setTipo(0);
    }
  }, [acompanhamento]);

  const UpdateAcompanhamento = useCallback(async () => {
    try {
      setLoading(true);
      const acm = await UpdateAcompanhamentoSchema(acompanhamento);
      const { success, data } = await Service.UpdateAcm(acm);
      if (success) {
        const newAcms = acompanhamentos.map((acm) => {
          if (acm.id === data.id) {
            return {
              ...acm,
              ...data
            };
          }
          return acm;
        });
        handleSnackBar({
          type: 'success',
          message: 'Acompanhamento editado.'
        });
        return setAcompanhamentos(newAcms);
      }
      throw new Error(data.message);
    } catch (error) {
      console.log(error);
      handleSnackBar({
        type: 'error',
        message: error && error.message || 'Erro em atualizar acompanhamento.'
      });
    } finally {
      setLoading(false);
      setCurrID(null);
      setTipo(0);
    }
  }, [acompanhamento, acompanhamentos]);

  const DeleteAcompanhamento = useCallback(
    async (id = null) => {
      try {
        setLoading(true);
        const { success, data } = await Service.DeleteAcm(id ? id : currID);
        if (success) {
          const newAcms = acompanhamentos.filter(
            (acm) => parseInt(acm.id) !== parseInt(id ? id : currID)
          );
          handleSnackBar({
            type: 'success',
            message: 'Acompanhamento deletado.'
          });
          return setAcompanhamentos(newAcms);
        }
        throw new Error(data.message);
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: error && error.message || 'Erro em atualizar acompanhamento.'
        });
      } finally {
        setLoading(false);
        setCurrID(null);
        setTipo(0);
      }
    },
    [currID, acompanhamentos]
  );

  return (
    <AcompanhamentosChamadoContext.Provider
      value={{
        acompanhamento,
        setAcompanhamento,
        acompanhamentos,
        setAcompanhamentos,
        tipo,
        setTipo,
        errors,
        setErrors,
        handleChange,
        InsertAcompanhamento,
        UpdateAcompanhamento,
        DeleteAcompanhamento,
        loading,
        setLoading,
        currID,
        setCurrID,
      }}
    >
      {children}
    </AcompanhamentosChamadoContext.Provider>
  );
};

AcompanhamentosChamadoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default () => {
  return useContext(AcompanhamentosChamadoContext);
}

export { AcompanhamentosChamadoContext, AcompanhamentosChamadoProvider };
