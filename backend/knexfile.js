// Update with your config settings.

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

	migration: {
		client: process.env.DB_DIALECT ? process.env.DB_DIALECT : "mysql2",
		connection: {
			host: process.env.DB_HOST,
			database: "chamadostest",
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
