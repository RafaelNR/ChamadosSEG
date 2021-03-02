const axios = require('axios')
const http = require('http')


module.exports = axios.create({
	baseURL: process.env.URL_SERVICE,
	headers: { Authorization: `Bearer ${process.env.ACCESS_SERVICE}` },
	validateStatus: function (status) {
		return status < 500;
	},
	timeout: 60000,
	httpAgent: new http.Agent({ keepAlive: true }),
});

