import ErrorMessages from '../Store/ErrorMessage'

export const handleResponse = async (res) => {
  const response = await res;

  const { data, statusText } = response;

  if (statusText === 'Unauthorized') {
    handleErrorMessage(data.message);
  }

  return response;
};

const registerErrorMessage = (Message) => {
  localStorage.setItem('ErrorMessage', JSON.stringify(Message));
  window.location.href = '/logout';
};

const handleErrorMessage = (Message) => {
  if (ErrorMessages.includes(Message)) {
    return registerErrorMessage(Message);
  } else {
    return registerErrorMessage('Erro de autenticação.');
  }
};

