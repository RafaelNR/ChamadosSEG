import axios from "axios";

class Service {

	constructor() {
		this.axios = axios;
		this.Api = this.axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			validateStatus: function (status) {
    		return status < 500;
  		}
		})
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
	source() {
		console.log("Operação cancelada pelo usuário!");
		this.axios.CancelToken.source().cancel("Operação cancelada pelo usuário!");
	}

	/**
	 * Simula um request com tempo predefinido.
	 * @param {String} query Recebe um query para execução
	 * @param {Number} time Tempo para resolver a promisse
	 */
	promise(query, time = 4000) {
		let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
				resolve(query)
			}, time)
		})
			
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
			return fn(url, data, { cancelToken: this.source() });
		}
			
		return fn(url, { cancelToken: this.source() });

	}

}


export default new Service;