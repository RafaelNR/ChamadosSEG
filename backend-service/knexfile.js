// Update with your config settings.
module.exports = {
	dev: {
		client: process.env.DB_DIALECT ? process.env.DB_DIALECT : "mysql2",
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWD,
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
	},
};
