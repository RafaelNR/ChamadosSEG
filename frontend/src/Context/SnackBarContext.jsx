import React, { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import useMessage from '../Hooks/useMessage'

const SnackBarContext = createContext({});

const SnackBarProvider = ({ children }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const { message, setMessage, handleMessage } = useMessage();

  const clickSnackBar = useCallback(() => {
    setOpenSnackBar(!openSnackBar);
  }, [openSnackBar]);

  const handleSnackBar = useCallback(
    ({ type, message }) => {
      handleMessage(type, message);
      setSeverity(type);
      setOpenSnackBar(true);
    },
    [setSeverity, setOpenSnackBar, handleMessage]
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
