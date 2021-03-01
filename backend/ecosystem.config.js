'use strict';

module.exports = {
	apps: [
		{
			name: "OSBackend",
			script: "./index.js",
			watch: true,

			env_dev: {
				APP_NAME: process.env.APP_NAME,
				NODE_ENV: process.env.NODE_ENV,
				DEPLOY: process.env.NODE_ENV,
				IP: process.env.IP,
				SECRET: process.env.SECRET,
				BACK_PORT: process.env.BACK_PORT,
				DB_NAME: process.env.DB_NAME,
				DB_USER: process.env.DB_USER,
				DB_PASSWD: process.env.DB_PASSWD,
				DB_HOST: process.env.DB_HOST,
				DB_DIALECT: process.env.DB_DIALECT,
				VERSION: process.env.VERSION,
				VERSIONDB: process.env.VERSIONDB,
				ACCESS_SERVICE: process.env.ACCESS_SERVICE,
				URL_SERVICE: process.env.URL_SERVICE,
			},
			env_prod: {
				APP_NAME: process.env.APP_NAME,
				NODE_ENV: process.env.NODE_ENV,
				DEPLOY: process.env.NODE_ENV,
				IP: process.env.IP,
				SECRET: process.env.SECRET,
				BACK_PORT: process.env.BACK_PORT,
				DB_NAME: process.env.DB_NAME,
				DB_USER: process.env.DB_USER,
				DB_PASSWD: process.env.DB_PASSWD,
				DB_HOST: process.env.DB_HOST,
				DB_DIALECT: process.env.DB_DIALECT,
				VERSION: process.env.VERSION,
				VERSIONDB: process.env.VERSIONDB,
				ACCESS_SERVICE: process.env.ACCESS_SERVICE,
				URL_SERVICE: process.env.URL_SERVICE,
			},
		},
	],
};