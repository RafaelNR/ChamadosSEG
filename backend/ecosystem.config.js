'use strict';

module.exports = {
	apps: [
		{
			name: "OSBackend",
			script: "./index.js",
			watch: true,
			
			env_dev: {
				APP_NAME: "OSTECNICOS_BACKEND",
				NODE_ENV: "dev",
				DEPLOY: "dev",
				IP: "127.0.0.1",
				SECRET: "rafael@seg@chamados",
				BACK_PORT: 3000,
				DB_NAME: "segchamados",
				DB_USER: "root",
				DB_PASSWD: "",
				DB_HOST: "localhost",
				DB_DIALECT: "mysql2",
				VERSION: "1.0.0",
				VERSIONDB: "1.0.0",
				ACCESS_SERVICE: "rafael@access",
				URL_SERVICE: "http://localhost:3001",
			},
			env_prod: {
				APP_NAME: "OSTECNICOS_BACKEND",
				NODE_ENV: "prod",
				DEPLOY: "prod",
				IP: "127.0.0.1",
				SECRET: "rafael@seg@chamados",
				BACK_PORT: 3000,
				DB_NAME: "segchamados",
				DB_USER: "root",
				DB_PASSWD: "Seg@2021",
				DB_HOST: "localhost",
				DB_DIALECT: "mysql2",
				VERSION: "1.0.0",
				VERSIONDB: "1.0.0",
				ACCESS_SERVICE: "rafael@access",
				URL_SERVICE: "http://localhost:3001",
			},
		},
	],
};