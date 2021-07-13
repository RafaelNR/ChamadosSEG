import React, { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import ErrorMessages from '../Store/ErrorMessage'

import useAuth from '../Hooks/useAuth';
import useLocalStore from '../Hooks/useLocalStore';

const SnackBarContext = createContext({});

const SnackBarProvider = ({ children }) => {
  const { Logout } = useAuth();
  const { getData,setData } = useLocalStore();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState(null);

  const clickSnackBar = useCallback(() => {
    setOpenSnackBar(!openSnackBar);
    setMessage(null)
  }, [openSnackBar]);

  const handleSnackBar = useCallback(
    ({ type, message }) => {
      if (type === 'error') setMessage(handleError(message));
      if (message.message) setMessage(message.message);
      else setMessage(message);

      setSeverity(type);
      setOpenSnackBar(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleError = useCallback(
    (msg) => {
      // Se erro na requisições da API;
      const ErrorMessage = getData('ErrorMessage');
      if (ErrorMessages.includes(ErrorMessage)) {
        setData('ErrorMessage', ErrorMessage);
        return Logout();
      }
      return msg;
    },
    // eslint-disable-next-line
    []
  );


  return (
    <SnackBarContext.Provider
      value={{
        openSnackBar,
        setOpenSnackBar,
        severity,
        setSeverity,
        message,
        setMessage,
        clickSnackBar,
        handleSnackBar,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useSnackBar() {
  return useContext(SnackBarContext);
}

export { SnackBarContext, SnackBarProvider };
