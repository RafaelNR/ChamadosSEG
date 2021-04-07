import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useRouter = () => {
  const location = useLocation();

  const getQuery = useCallback((key) => {
    const query = new URLSearchParams(location.search);
    return query.get(key);
  },[])

  return {
    getQuery
  };
  
}

export default useRouter;