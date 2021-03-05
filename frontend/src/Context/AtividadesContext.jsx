import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
import * as Crud from "../Api/Crud";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";
import useUser from '../Hooks/useUser';

//* SERVICE
import { AtividadePDF } from '../Service/pdf.service'
import { getAtividades } from '../Service/atividade.service'

//* SHEMAS
import { FilterAtividadesSchema} from '../Schemas/Atividades.Schema'

const AtividadesContext = createContext({});

const AtividadesProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { loading, setLoading } = useLoading();
  const { roleID } = useUser();
  const [atividades, setAtividades] = useState([]);
  const [loadingPDF, setLoadingPDF] = useState(false);

  useEffect(() => {
    let render = true;
    setLoading(true);

    (async () => {
      try {
        const URL = roleID <= 2 ? 'atividades' : 'atividades/clientes';
        const resp = await Crud.get(URL);
        const { success, data } = resp.data;
        if (!success) throw resp.data;
        if  (render) setAtividades(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        return handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : 'Erro em carregar atividades. Por favor tente mais tarde.'
        });
      }
    })();

    return function cleanup() {
      render = false;
      Crud.default.cancel('AtividadeContext unmounted');
    };
  }, []);

  const downloadPDF = (ticket) => {
    setLoadingPDF(true);
    AtividadePDF(ticket)
      .then((Dados) => {
        if (Dados.success) {
          window.open(Dados.link);
        }
      })
      .catch((error) => {
        return handleSnackBar({
          type: 'error',
          message: error && error.message ? error.message : 'Erro gerar PDF'
        });
      })
      .finally(() => {
        setLoadingPDF(false);
      });
  }

  const filterAtividades = async (Dados) => {
    try {

      if (Object.keys(Dados).length === 0) {
        const error = await FilterAtividadesSchema(Dados);
        throw error.errors;
      }

      if (Boolean(Dados.data_inicial) && !Boolean(Dados.data_final)) {
          throw 'Data final precisa estar preenchida.';
      }

      if (!Boolean(Dados.data_inicial) && Boolean(Dados.data_final)) {
          throw 'Data inicial precisa estar preenchida.'
      }
      
      setAtividades(await getAtividades(Dados));

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <AtividadesContext.Provider
      value={{
        atividades,
        setAtividades,
        loading,
        loadingPDF,
        downloadPDF,
        filterAtividades
      }}
    >
      {children}
    </AtividadesContext.Provider>
  );
};

export default function useAtividades() {
  return useContext(AtividadesContext);
}

export { AtividadesContext, AtividadesProvider };

AtividadesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
