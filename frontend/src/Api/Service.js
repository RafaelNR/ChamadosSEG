import axios from "axios";
import { handleResponse } from './Response'

const CancelToken = axios.CancelToken;
// Origem do token de cancelamento:
const cancelTokenSource = CancelToken.source();

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  validateStatus: function (status) {
    return status < 500;
  }
});

const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
}

const setToken = () => {
  Api.defaults.headers.access_token = getToken();
}

/**
 * Simula um request com tempo predefinido.
 * @param {String} query Recebe um query para execução
 * @param {Number} time Tempo para resolver a promisse
 */
const promise = (query, time = 500) => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(query);
    }, time);
  });

  return promise;
}

/**
 * Executa a API.
 * @param {String} method -> Recebe o verbo http
 * @param {String} url -> recebe a url da api
 * @param {Objeto} data -> Recebe os dados que serão tratado
 */
const exec = async (method, url, data = null) => {
  setToken();
  const fn = Api[method];
  let response = ''
  if (data) {
    response =
      process.env.REACT_APP_NODE === 'dev'
        ? promise(fn(url, data, { cancelToken: cancelTokenSource.token }))
        : fn(url, data, { cancelToken: cancelTokenSource.token });
  } else {
    response = fn(url, { cancelToken: cancelTokenSource.token });
  }

  return await handleResponse(response);
}


export default {
  exec,
  Api
}