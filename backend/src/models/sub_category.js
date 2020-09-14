const knex = require("../database/index");

const index = async () => {
	return await knex.select("id", "nome").from("sub_categorias").limit(100);
};

module.exports = {
	index,
};
