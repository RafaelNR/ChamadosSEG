// Update with your config settings.
const config = require("dotenv").config({ path: ".env" }).parsed;

module.exports = {
	dev: {
		client: config.DB_DIALECT ? config.DB_DIALECT : "mysql2",
		connection: {
			host: config.DB_HOST,
			database: config.DB_NAME,
			user: config.DB_USER,
			password: config.DB_PASSWD,
		},
	}
};
