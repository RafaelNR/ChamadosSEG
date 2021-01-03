import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
import * as Api from "../Api/Crud";

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";
import useUser from '../Hooks/useUser';

const AtividadesContext = createContext({});

const AtividadesProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const { roleID } = useUser();
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const resp =
          roleID <= 2
            ? await Api.get('atividades')
            : await Api.get('atividades/user');
        const { success, data } = resp.data;
        if (!success) throw resp.data;
        setLoading(false);
        return setAtividades(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        return handleSnackBar({
          type: 'error',
          message: error.message
            ? error.message
            : 'Erro em carregar atividades. Por favor tente mais tarde.'
        });
      }
    }

    init();

    return function cleanup() {
      console.log('unmounted component');
      Api.default.source();
    };
  }, [handleSnackBar, setLoading, roleID]);


  return (
    <AtividadesContext.Provider
      value={{
        atividades,
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
