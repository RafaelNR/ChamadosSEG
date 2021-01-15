"use strict";

module.exports = {
	apps: [
		{
			name: "OSBackend-Service",
			script: "./server.js",
			watch: true,
			env_dev: {
				APP_NAME: "OSTECNICOS_BACKEND_SERVICE",
				NODE_ENV: "dev",
				DEPLOY: "dev",
				IP: "127.0.0.1",
				BACK_PORT: 3001,
				DB_NAME: "segchamados",
				DB_USER: "root",
				DB_PASSWD: "",
				DB_HOST: "localhost",
				DB_DIALECT: "mysql2",
				VERSION: "1.0.0",
				VERSIONDB: "1.0.0",
				SECRET: "rafael@access",
				URL_SERVICE: "http://localhost:3001",
			},
			env_prod: {
				APP_NAME: "OSTECNICOS_BACKEND_SERVICE",
				NODE_ENV: "prod",
				DEPLOY: "prod",
				IP: "127.0.0.1",
				BACK_PORT: 3001,
				DB_NAME: "segchamados",
				DB_USER: "root",
				DB_PASSWD: "Seg@2021",
				DB_HOST: "localhost",
				DB_DIALECT: "mysql2",
				VERSION: "1.0.0",
				VERSIONDB: "1.0.0",
				SECRET: "rafael@access",
				URL_SERVICE: "http://10.42.0.252:3001",
			},
		},
	],
};
