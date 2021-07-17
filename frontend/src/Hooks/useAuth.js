import { useCallback } from 'react';
import useLocalStore from './useLocalStore';
import { useHistory } from 'react-router-dom';


//* USANDO PARA AUTENTICAR AÇÕES DENTRO DA MESMA PÁGINA 
//* Exemplo: Mudança de TAB, Editar;
const useAuth = () => {
  const { removeData } = useLocalStore();
  const history = useHistory();

  const Logout = useCallback(() => {
    removeData('token');
    removeData('user');
    history.replace('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return {
    Logout
  };
};

export default useAuth;
