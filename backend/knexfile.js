// Update with your config settings.
require("dotenv/config");

module.exports = {
	dev: {
		client: "mysql2",
		connection: {
			host: 'localhost',
			database: 'segchamados',
			user: 'root',
			passwd: '',
		},
		migrations: {
			tableName: "migrations",
			directory: `${__dirname}/src/database/migrations`,
		},
		seeds: {
			directory: `${__dirname}/src/database/seeds`,
		},
	},

	prod: {
		client: process.env.DB_DIALECT ? process.env.DB_DIALECT : "mysql2",
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWD,
		},
		migrations: {
			tableName: "migrations",
			directory: `${__dirname}/src/database/migrations`,
		},
		seeds: {
			directory: `${__dirname}/src/database/seeds`,
		},
	},

};
