import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import * as Crud from "../Api/Crud";
import useRouter from '../Hooks/useRouter';

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
  const { getQuery } = useRouter();
  const { handleSnackBar } = useSnackBar();
  const { loading, setLoading } = useLoading();
  const { roleID } = useUser();
  const [atividades, setAtividades] = useState([]);
  const [loadingPDF, setLoadingPDF] = useState(false);

  const getURL = useCallback(() => {
    const query = getQuery('type');
    const types = ['close', 'last', 'half', 'open'];
    let URL =
      roleID === 1 || roleID === 2 ? 'atividades' : 'atividades/myclientes';

    if (types.includes(query)) {
      URL =
        roleID === 1 || roleID === 2
          ? `atividades?type=${query}`
          : `atividades/myclientes?type=${query}`;
    }

    return URL;
  }, []);

  useEffect(() => {
    let render = true;
    setLoading(true);

    if (roleID) {
      (async () => {
        try {
          const resp = await Crud.get(getURL());
          const { success, data } = resp.data;
          if (!success) throw resp.data;
          if (render) setAtividades(data);
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
    }

    return function cleanup() {
      render = false;
      Crud.default.cancel('AtividadeContext unmounted');
    };
  }, [roleID]);


  const downloadPDF = useCallback((ticket) => {
    console.log(ticket)
    setLoadingPDF(true);
    AtividadePDF(ticket)
      .then((Dados) => {
        console.log(Dados)
        if (Dados.success) {
          window.open(Dados.data.link);
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
  },[])

  const filterAtividades = useCallback(async (Dados) => {
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

      const resp = await getAtividades(Dados);

      console.log(resp)
      
      setAtividades(await getAtividades(Dados));

    } catch (error) {
      console.log(error)
    }

  },[])

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
