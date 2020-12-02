import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

const useMessage = () => {
  const [message, setMessage] = useState("");
  const history = useHistory();

 function handleMessage(type, msg){
    return type !== 'success' && handleError(msg);
  }

  const handleError = useCallback((msg) => {
    console.log(msg)
    if(msg.code && msg.code === 'ECONNREFUSED'){
      setMessage('Erro em se conectar com banco de dados.');
      return history.replace('/');
    }

    else if(msg.message){
      return setMessage(msg.message)
    }

    return setMessage(msg);

  },[setMessage])


  function handleSuccess(){
    return '';
  }

  return {
    message,
    setMessage,
    handleMessage,
  };
};

export default useMessage;
