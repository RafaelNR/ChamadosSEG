import { useCallback } from 'react';
import useLocalStore from './useLocalStore';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const { removeData } = useLocalStore();
  const history = useHistory();

  const Logout = useCallback(() => {
    removeData('token');
    removeData('user');
    history.replace('/login');
  }, [removeData,history]);

  return {
    Logout
  };
};

export default useAuth;
