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

const AtividadesContext = createContext({});

const AtividadesProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const { roleID } = useUser();
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    async function init() {
      if (roleID) {
        try {
          const URL = roleID <= 2 ? 'atividades' : 'atividades/clientes';
          const resp = await Crud.get(URL);
          const { success, data } = resp.data;
          if (!success) throw resp.data;
          setLoading(false);
          return setAtividades(data);
        } catch (error) {
          console.log(error);
          setLoading(false);
          return handleSnackBar({
            type: 'error',
            message: error && error.message
              ? error.message
              : 'Erro em carregar atividades. Por favor tente mais tarde.'
          });
        }
      }
    }

    init();

    return function cleanup() {
      Crud.default.cancel("AtividadeContext unmounted")
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
