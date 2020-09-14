const knex = require("../database");

const checkRole = async (userID) => {
	return await knex
		.select("role_id")
		.from("users")
		.where("id", "=", userID)
		.limit(1)
		.then((e) => e[0].role_id);
};

module.exports = {
	checkRole,
};
