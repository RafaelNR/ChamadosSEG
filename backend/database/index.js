const knexfile = require("../../knexfile.js");
// const knex = require("knex")(
// 	process.env.NODE_ENV === "test" ? knexfile.test : knexfile.development
// );
const knex = require("knex")(knexfile.development);

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
