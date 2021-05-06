import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
import Service from '../Service/log.service'

import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const LogContext = createContext({});

const LogProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const [logs, setLogs] = useState([]);
  const [currentTab, setCurrentTab] = React.useState(0);

  useEffect(() => {
    let render = true;
    setLoading(true);
    setLogs([]);

    (async () => {
      try {
        const Dados = !currentTab ? await Service.acesso() : await Service.email();
        const { success, data } = Dados;
        if (success && render) return setLogs(data);
        throw new Error(data.message);
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: error.message
            ? error.message
            : 'Erro em carregar log, por favor tente mais tarde.'
        });
      } finally {
        setLoading(false);
      }
    })();

    return function cleanup() {
      render = false;
    };
    // eslint-disable-next-line
  }, [currentTab]);

  const handleChange = React.useCallback(
    (event, newValue) => {
      setCurrentTab(newValue);
      setLoading(true);

      return () => {
        setLoading(false);
        return;
      };
    },
    [setLoading]
  );

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
        currentTab,
        handleChange,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export default function useLog() {
  return useContext(LogContext);
}

export { LogContext, LogProvider };

LogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
