import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();

  const getQuery = useCallback((key) => {
    const query = new URLSearchParams(location.search);
    return query.get(key);
    // eslint-disable-next-line
  },[])

  return {
    getQuery
  };
  
}

export default useQuery;