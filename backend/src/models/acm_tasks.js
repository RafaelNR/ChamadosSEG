const knex = require("../database/index");

const indexByTask = async (task_id) => {
	return knex
		.select(
			"acm_tasks.id as id",
			"type",
			"descricao",
			"user.id as user_id",
			"user.nome as nome",
			"acm_tasks.created_at",
			"acm_tasks.updated_at"
		)
		.from("acm_tasks")
		.join("users as user", "user.id", "=", "acm_tasks.user_id")
		.where("acm_tasks.task_id", "=", task_id);
};

const findOne = async (id) => {
	return knex
		.select(
			"acm_tasks.id",
			"type",
			"descricao",
			"user.id as user_id",
			"user.nome as nome",
			"acm_tasks.created_at",
			"acm_tasks.updated_at"
		)
		.from("acm_tasks")
		.join("users as user", "user.id", "=", "acm_tasks.user_id")
		.where("acm_tasks.id", "=", id)
		.limit(1)
		.then((e) => e[0]);
};

const insert = async (Dados) => {
	return await knex.insert(Dados).into("acm_tasks");
};

const update = async (Dados) => {
	return await knex("acm_tasks").where({ id: Dados.id }).update(Dados);
};

const deletar = async (id) => {
	return await Knex("acm_tasks").del().where({ id });
};

module.exports = {
	indexByTask,
	findOne,
	insert,
	update,
	deletar,
};
