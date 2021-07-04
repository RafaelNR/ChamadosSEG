"use strict";

module.exports = {
	apps: [
		{
			name: "OSBackend-Service",
			script: "./server.js",
			watch: true,
			ignore_watch: ["./node_modules", "./static","./tmp"],
			env_dev: {
				APP_NAME: process.env.APP_NAME,
				NODE_ENV: process.env.NODE_ENV,
				DEPLOY: process.env.NODE_ENV,
				IP: process.env.IP,
				BACK_PORT: process.env.BACK_PORT,
				DB_NAME: process.env.DB_NAME,
				DB_USER: process.env.DB_USER,
				DB_PASSWD: process.env.DB_PASSWD,
				DB_HOST: process.env.DB_HOST,
				DB_DIALECT: process.env.DB_DIALECT,
				VERSION: process.env.VERSION,
				VERSIONDB: process.env.VERSIONDB,
				SECRET: process.env.SECRET,
				URL_SERVICE: process.env.URL_SERVICE,
				URL_BACKEND: process.env.URL_BACKEND,
				URL_FRONTEND: process.env.URL_FRONTEND,
			},
			env_prod: {
				APP_NAME: process.env.APP_NAME,
				NODE_ENV: process.env.NODE_ENV,
				DEPLOY: process.env.NODE_ENV,
				IP: process.env.IP,
				BACK_PORT: process.env.BACK_PORT,
				DB_NAME: process.env.DB_NAME,
				DB_USER: process.env.DB_USER,
				DB_PASSWD: process.env.DB_PASSWD,
				DB_HOST: process.env.DB_HOST,
				DB_DIALECT: process.env.DB_DIALECT,
				VERSION: process.env.VERSION,
				VERSIONDB: process.env.VERSIONDB,
				SECRET: process.env.SECRET,
				URL_SERVICE: process.env.URL_SERVICE,
				URL_BACKEND: process.env.URL_BACKEND,
				URL_FRONTEND: process.env.URL_FRONTEND,
			},
		},
	],
};
