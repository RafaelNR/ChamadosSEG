import React, { createContext, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

//* SERVICE
import * as Service from '../Service/chamados.service';

//** CONTEXT
import useSnackBar from './SnackBarContext';
import useLoading from './LoadingContext';

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

      console.log(acm)

      if (acm.error) {
        console.log(acm.errors)
        throw new Error('Erro em inserir acompanhamento. '+acm.errors.descricao);
      }

      const { success, data } = await Service.InsertAcm(acm);
      if (success) {
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
          error && error.message
            ? error.message
            : 'Erro em inserir acompanhamento no chamado.'
      });
    } finally {
      setLoading(false);
      setTipo(0);
    }
  }, [acompanhamento]);

  const UpdateAcompanhamento = useCallback(async () => {
    try {
      setLoading(true);
      console.log(acompanhamento);
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
        return setAcompanhamentos(newAcms);
      }
      throw new Error(data.message);
    } catch (error) {
      console.log(error);
      handleSnackBar({
        type: 'error',
        message:
          error && error.message
            ? error.message
            : 'Erro em atualizar acompanhamento.'
      });
    } finally {
      setLoading(false);
      setCurrID(null);
      setTipo(0);
    }
  }, [acompanhamento]);

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
