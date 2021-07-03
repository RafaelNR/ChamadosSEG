const knex = require("../database");

const findOne = (id) => {
	return knex
		.select(
			"acm_chamados.id",
			"tipo",
			"chamado_id",
			"descricao",
			"users.id as user_id",
			"nome",
			"user",
			"role_id",
			"imagem",
			"acm_chamados.created_at",
			"acm_chamados.updated_at"
		)
		.from("acm_chamados")
		.innerJoin("users", "users.id", "=", "acm_chamados.user_id")
		.where("acm_chamados.id", "=", id)
		.then((e) => e[0]);
};


module.exports = {
	findOne,
};