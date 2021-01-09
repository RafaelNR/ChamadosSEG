import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import useAuth from './useAuth';

const useMessage = () => {
  const [message, setMessage] = useState("");
  const { Logout } = useAuth();
  const history = useHistory();

  function handleMessage(type, msg) {

    if (type !== 'success') return handleError(msg);

    if (msg.message) return setMessage(msg);
    
    return setMessage(msg);
  }

  const handleError = useCallback(
    (msg) => {
      if (
        msg === 'Network Error' ||
        msg === 'Autenticação expirou.'
        ) {
        return Logout();
      } else if (msg.code && msg.code === 'ECONNREFUSED') {
        return Logout();
      } else if (msg.message) {
        return setMessage(msg.message);
      }

      return setMessage(msg);
    },
    [setMessage, history]
  );


  function handleSuccess(){
    return '';
  }

  return {
    message,
    setMessage,
    handleMessage,
    handleSuccess
  };
};

export default useMessage;
