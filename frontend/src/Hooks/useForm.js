import { useState, useEffect, useCallback } from "react";
import useMasker from "./useMasker";

const useForm = (currValues = {}) => {
  const [values, setValues] = useState(currValues);
  const { Masker } = useMasker();

  useEffect(() => {
    setValues(currValues);
  },[currValues])

  /**
   * Trata quando usuário digita no teclado
   * @param {object} event
   */
  const handleChange = useCallback(
    (event) => {
      const key = event.target.name;
      const value = Masker(event.target.value, key);
      console.log(values);
      setValues({
        ...values,
        [key]: value,
      });
    },
    [values, Masker]
  );

  return {
    values,
    setValues,
    handleChange,
  };
};

export default useForm;
