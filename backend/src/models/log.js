const knex = require("../database/index");

module.exports = {
	insert: async (Dados) => await knex.insert(Dados).into("logs"),
};
