import { useState, useEffect, useCallback } from "react";
import useMasker from "./useMasker";

const useForm = (currValues = {}) => {
  const [values, setValues] = useState(currValues);
  const { Masker } = useMasker();

  useEffect(() => {
    setValues(currValues);
  },[currValues])

  const handleChange = useCallback(
    (event) => {
      const key = event.target.name;
      const value = Masker(event.target.value, key);

      setValues((props) => {
        return {
          ...props,
          [key]: value
        };
      });
    },
    // eslint-disable-next-line
    []
  );

  return {
    values,
    setValues,
    handleChange,
  };
};

export default useForm;
