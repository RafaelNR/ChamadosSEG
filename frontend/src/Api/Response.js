import { useState, useEffect, useCallback } from 'react';

const Response = () => {

  const handleResponse = (response) => {

    const { data, status, statusText } = response

    if (statusText === 'Unauthorized') {
      return handleErrorMessage(data.message);
    }
    
    return data;

  }

  const handleLogout = (Message) => {
    localStorage.setItem('ErrorMessage', Message)
  }

  const handleErrorMessage = (Message) => {
    switch (Message) {
      case 'Network Error':
      case 'Autenticação expirou.':
      case 'Error: Autenticação expirou.':
      case 'Autenticação expirou ou não é mais valida.':
      case 'Sem Autenticação ou Autorização.':
      case Message.code && Message.code === 'ECONNREFUSED':
        return handleLogout(Message);

      default:
        return handleLogout('Erro de autenticação.');
    }
  }

  return {
    handleResponse
  };
};

export default useResponse;
