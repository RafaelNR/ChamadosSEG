import axios from "axios";

class Service {
  constructor() {
    this.axios = axios;
    this.Api = this.axios.create({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      validateStatus: function (status) {
        return status < 500;
      }
    });
    this.CancelToken = axios.CancelToken
    this.source = this.CancelToken.source()
  }

  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }

  setToken() {
    this.Api.defaults.headers.access_token = this.getToken();
  }

  removeToken() {
    this.Api.defaults.headers.access_token = null;
  }

  /**
   * Cancela a requisição a api, quando ainda está sendo processada.
   */
  async cancel(msg) {
    await this.axios.CancelToken.source().cancel(msg)
  }

  /**
   * Simula um request com tempo predefinido.
   * @param {String} query Recebe um query para execução
   * @param {Number} time Tempo para resolver a promisse
   */
  promise(query, time = 500) {
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
  exec(method, url, data = null) {
    const fn = this.Api[method];
    this.setToken();
    if (data) {
      return process.env.REACT_APP_NODE === 'dev'
        ? this.promise(fn(url, data, { cancelToken: this.source.token }))
        : fn(url, data, { cancelToken: this.source.token });
    }
    return fn(url, { cancelToken: this.source.token });
  }
}

export default new Service();
