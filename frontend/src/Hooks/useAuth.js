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
<<<<<<< HEAD
    // eslint-disable-next-line
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96
  }, [history]);

  return {
    Logout
  };
};

export default useAuth;
