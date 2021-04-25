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
  const [logs, setLogs] = useState();

  useEffect(() => {
    let render = true;
    setLoading(true);

    (async () => {
      try {
        const Dados = await Service.index();
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
      return Service.Cancel('LogContext unmount');
    };
    // eslint-disable-next-line
  }, []);

  return (
    <LogContext.Provider
      value={{
        logs
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
