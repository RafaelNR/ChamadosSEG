const knexfile = require("../../knexfile.js");
const knex = require("knex")(process.env.NODE_ENV === 'prod' ? knexfile.prod : knexfile.dev);

if (process.env.NODE_ENV === "dev") {
	knex
		.on("query", (query) => {
			console.log({
				sql: query.sql,
				bindings: query.bindings ? query.bindings.join(",") : "",
			});
		})
		.on("error", (error) => console.log("> Knex: ", error));
}

module.exports = knex;
