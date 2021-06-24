import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import useAuth from './useAuth';

const useMessage = () => {
  const [message, setMessage] = useState(null);
  const { Logout } = useAuth();
  const history = useHistory();

  function handleMessage(type, msg) {

    if (type !== 'success') return handleError(msg);

    if (msg.message) return setMessage(msg);
    
    return setMessage(msg);
  }

  const handleError = useCallback(
    (msg) => {

      switch (msg) {
        case 'Network Error':
        case 'Autenticação expirou.':
        case msg.code && msg.code === 'ECONNREFUSED':
          return Logout();
        
        case msg.message:
          return setMessage(msg.message);
        default:
          return setMessage(msg);
      }

    },
    // eslint-disable-next-line
    [history]
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
