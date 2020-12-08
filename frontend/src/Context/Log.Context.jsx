import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
//import * as Api from "../Api/Crud";
import Service from '../Service/log.service'


import useSnackBar from "./SnackBarContext";
import useLoading from "./LoadingContext";

const LogContext = createContext({});

const LogProvider = ({ children }) => {
  const { handleSnackBar } = useSnackBar();
  const { setLoading } = useLoading();
  const [logs, setLogs] = useState();
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    Service.index()
      .then(Dados => {
        setLoading(false)
        const { success, data } = Dados;
        if (success) return setLogs(data);
        throw { message: data.message};
      }).catch(error => {
        console.log(error);
        setLoading(false);
        handleSnackBar({
          type: "error",
          message: error.message ? error.message : "Erro em carregar log, por favor tente mais tarde.",
        });
      })

    return function cleanup() {
      console.log("unmounted Log");
      return Service.Cancel;
    };
  }, [setLogs, handleSnackBar, setLoading]);

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
