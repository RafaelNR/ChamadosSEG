const knex = require("../database/index");

const index = async () => {
	return await knex.select("id", "nome").from("sub_categorias").limit(100);
};

const findOne = (ID) => {
	return knex
		.select("id", "nome", "created_at", "updated_at")
		.from("sub_categorias")
		.where("id", "=", ID)
};

const findCategoria = (ID) => {
	return knex
		.select("id", "nome", "created_at", "updated_at")
		.from("sub_categorias")
		.where("categoria_id", "=", ID);
};

module.exports = {
	index,
	findOne,
	findCategoria
};
