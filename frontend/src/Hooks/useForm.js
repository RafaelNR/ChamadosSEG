
import { useState, useEffect, useCallback } from "react";
import useMasker from "./useMasker";

const useForm = (initValue) => {
  const [values, setValues] = useState({});
  const [value, setValue] = useState('');
  const { Masker } = useMasker();

  useEffect(() => {
    typeof initValue === 'object' ? setValues(initValue) : setValue(initValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeValue = useCallback((event) => {
    const name = event.target.name;
    const value = Masker(event.target.value, name);
    setValues(value);
    // eslint-disable-next-line
  }, []);

  const handleChangeValues = useCallback(
    (event) => {
      const name = event.target.name;
      const value = Masker(event.target.value, name);
      setValues((props) => {
        return {
          ...props,
          [name]: value
        };
      });
    },
    // eslint-disable-next-line
    []
  );

  const handleSubmit = useCallback((event, cb) => {
    event.preventDefault();
    return cb();
  }, []);

  return {
    value,
    setValue,
    values,
    setValues,
    handleChangeValue,
    handleChangeValues,
    handleSubmit
  };
};

export default useForm;
