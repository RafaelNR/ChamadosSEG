import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useResponse from './Response';



const useService = () => {
  const { handleResponse } = useResponse();

  const Api = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    validateStatus: function (status) {
      return status < 500;
    }
  });
  const CancelToken = axios.CancelToken;
  const cancelTokenSource = CancelToken.source();

  const getToken = () => {
    return JSON.parse(localStorage.getItem('token'));
  };

  const setToken = () => {
    Api.defaults.headers.access_token = getToken();
  };

  const removeToken = () => {
    Api.defaults.headers.access_token = null;
  };

  const cancel = (msg) => {
    axios.CancelToken.source().cancel(msg);
  };

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
  };

  /**
   * Executa a API.
   * @param {String} method -> Recebe o verbo http
   * @param {String} url -> recebe a url da api
   * @param {Objeto} data -> Recebe os dados que serão tratado
   */
  const exec = async (method, url, data = null) => {
    setToken();
    const fn = Api[method];
    let response = '';
    if (data) {
      response =
        process.env.REACT_APP_NODE === 'dev'
          ? await promise(
              fn(url, data, { cancelToken: cancelTokenSource.token })
            )
          : await fn(url, data, { cancelToken: cancelTokenSource.token });
    }
    response = await fn(url, { cancelToken: cancelTokenSource.token });
    return handleResponse(response);
  };

  return {
    getToken,
    setToken,
    removeToken,
    cancel,
    exec
  };

}

export default useService;