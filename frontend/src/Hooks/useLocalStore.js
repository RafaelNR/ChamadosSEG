import { useCallback } from "react";

export default () => {
  const getData = useCallback((item) => {

    return JSON.parse(localStorage.getItem(item));
  }, []);

  const setData = useCallback((item, Dados) => {
    if (Dados) localStorage.setItem(item, JSON.stringify(Dados));
  }, []);

  const removeData = useCallback((item) => {
    localStorage.removeItem(item);
  }, []);

  return {
    getData,
    setData,
    removeData,
  };
};
