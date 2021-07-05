import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";

//* CONTEXT
import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

//* HOOKS
import useQuery from '../Hooks/useQuery';
import useUser from '../Hooks/useUser';

//* SERVICE
import * as Crud from "../Api/Crud";
import { AtividadePDF } from '../Service/pdf.service'


const AtividadesContext = createContext({});

const AtividadesProvider = ({ children }) => {
  const { getQuery } = useQuery();
  const { handleSnackBar } = useSnackBar();
  const { loading, setLoading } = useLoading();
  const { roleID } = useUser();
  const [atividades, setAtividades] = useState([]);
  const [loadingPDF, setLoadingPDF] = useState(false);

  const getURL = useCallback(() => {
    const type = getQuery('type');
    const period = getQuery('period');
    const periods = ['close', 'last', 'half', 'open'];
    const types = ['my', 'cliente'];

    if (roleID) {
      
      if (!type || !period)
        // Acesso sem query de period or type
        return roleID !== 3 ? 'atividades' : 'atividades/myclientes';

      // Access gestor com type and period
      if (roleID !== 3 && types.includes(type) && periods.includes(period))
        return type === 'my'
          ? `atividades/myuser?period=${period}`
          : `atividades?period=${period}`;

      // Access técnico com period and type
      if (periods.includes(period) && types.includes(type))
        return type === 'my'
          ? `atividades/myuser?period=${period}`
          : `atividades/myclientes?period=${period}`;
      
    }
    //eslint-disable-next-line
  }, [roleID]);

  useEffect(() => {
    let render = true;
    setLoading(true);

    if (roleID) {
      (async () => {
        try {
          const resp = await Crud.get(getURL());
          const { success, data } = resp.data;
          if (render && success) return setAtividades(data);
          throw new Error(resp.data);
        } catch (error) {
          console.log(error);
          return handleSnackBar({
            type: 'error',
            message:
              error && error.message ? error.message :
              'Erro em carregar atividades. Por favor tente mais tarde.'
          });
        } finally {
          setLoading(false);
        }
        
      })();
    }

    return function cleanup() {
      render = false;
    };
    //eslint-disable-next-line
  }, [roleID]);

  const downloadPDF = useCallback((ticket) => {
    setLoadingPDF(true);
    AtividadePDF(ticket)
      .then((Dados) => {
        if (Dados.success) {
          return window.open(Dados.data.link);
        }

        throw new Error('Error em gerar PDF.');
      })
      .catch((error) => {
        return handleSnackBar({
          type: 'error',
          message: (error && error.message) || 'Erro em gerar PDF'
        });
      })
      .finally(() => {
        setLoadingPDF(false);
      });
    //eslint-disable-next-line
  },[])

  return (
    <AtividadesContext.Provider
      value={{
        atividades,
        setAtividades,
        loading,
        loadingPDF,
        downloadPDF,
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
