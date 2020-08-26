// Update with your config settings.
const config = require("dotenv").config({ path: ".env" }).parsed;

module.exports = {
	development: {
		client: config.DB_DIALECT,
		connection: {
			host: config.DB_HOST,
			database: config.DB_NAME,
			user: config.DB_USER,
			password: config.DB_PASSWD,
		},
		migrations: {
			tableName: "migrations",
			directory: `${__dirname}/backend/database/migrations`,
		},
		seeds: {
			directory: `${__dirname}/backend/database/seeds`,
		},
	},

	// test: {
	// 	client: "sqlite3",
	// 	connection: {
	// 		filename: "./__tests__/backend/data.sqlite",
	// 	},
	// },

	// production: {
	// 	client: "postgresql",
	// 	connection: {
	// 		database: "my_db",
	// 		user: "username",
	// 		password: "password",
	// 	},
	// 	pool: {
	// 		min: 2,
	// 		max: 10,
	// 	},
	// 	migrations: {
	// 		tableName: "knex_migrations",
	// 	},
	// },
};
