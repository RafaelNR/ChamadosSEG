import React, { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";

const SnackBarContext = createContext({});

const SnackBarProvider = ({ children }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState(null);

  const clickSnackBar = useCallback(() => {
    setOpenSnackBar(!openSnackBar);
    setMessage(null)
  }, [openSnackBar]);

  const handleSnackBar = useCallback(
    ({ type, message }) => {
      setMessage(message);
      setSeverity(type);
      setOpenSnackBar(true);
    },
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
