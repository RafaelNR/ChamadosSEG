const knex = require("../database/index");

const index = async () => {
	return await knex
		.select(
			"tasks.id",
			"status",
			"tasks.created_at",
			"tasks.updated_at",
			"clientes.id as cliente_id",
			"nome_fantasia as cliente_nome",
			"clientes.email as cliente_email",
			"proprietario.id as proprietario_id",
			"proprietario.nome as proprietario_nome",
			"proprietario.email as proprietario_email",
			"user.id as user_id",
			"user.nome as user_nome",
			"user.email as user_email"
		)
		.from("tasks")
		.join("clientes", "clientes.id", "=", "tasks.cliente_id")
		.join(
			"users as proprietario",
			"proprietario.id ",
			"=",
			"tasks.owner_user_id"
		)
		.join("users as user", "user.id ", "=", "tasks.open_by_user_id")
		.limit(100);
};

const indexMy = async (user_id) => {
	return await knex
		.select(
			"tasks.id",
			"status",
			"tasks.created_at",
			"tasks.updated_at",
			"clientes.id as cliente_id",
			"nome_fantasia as cliente_nome",
			"clientes.email as cliente_email",
			"proprietario.id as proprietario_id",
			"proprietario.nome as proprietario_nome",
			"proprietario.email as proprietario_email",
			"user.id as user_id",
			"user.nome as user_nome",
			"user.email as user_email"
		)
		.from("tasks")
		.join("clientes", "clientes.id", "=", "tasks.cliente_id")
		.join(
			"users as proprietario",
			"proprietario.id ",
			"=",
			"tasks.owner_user_id"
		)
		.join("users as user", "user.id ", "=", "tasks.open_by_user_id")
		.where("tasks.owner_user_id", "=", user_id)
		.orWhere("tasks.open_by_user_id", "=", user_id)
		.limit(100);
};

const indexMyCliente = async (client_id) => {
	return await knex
		.select(
			"tasks.id",
			"status",
			"tasks.created_at",
			"tasks.updated_at",
			"clientes.id as cliente_id",
			"nome_fantasia as cliente_nome",
			"clientes.email as cliente_email",
			"proprietario.id as proprietario_id",
			"proprietario.nome as proprietario_nome",
			"proprietario.email as proprietario_email",
			"user.id as user_id",
			"user.nome as user_nome",
			"user.email as user_email"
		)
		.from("tasks")
		.join("clientes", "clientes.id", "=", "tasks.cliente_id")
		.join(
			"users as proprietario",
			"proprietario.id ",
			"=",
			"tasks.owner_user_id"
		)
		.join("users as user", "user.id ", "=", "tasks.open_by_user_id")
		.where("clientes.id", "=", client_id)
		.limit(100);
};

const findOne = async (ID) => {
	return await knex
		.select(
			"tasks.id as id",
			"status",
			"tasks.created_at",
			"tasks.updated_at",
			"clientes.id as cliente_id",
			"nome_fantasia as cliente_nome",
			"clientes.email as cliente_email",
			"proprietario.id as proprietario_id",
			"proprietario.nome as proprietario_nome",
			"proprietario.email as proprietario_email",
			"user.id as user_id",
			"user.nome as user_nome",
			"user.email as user_email"
		)
		.from("tasks")
		.join("clientes", "clientes.id", "=", "tasks.cliente_id")
		.join(
			"users as proprietario",
			"proprietario.id ",
			"=",
			"tasks.owner_user_id"
		)
		.join("users as user", "user.id ", "=", "tasks.open_by_user_id")
		.where("tasks.id", "=", ID)
		.limit(1)
		.then((e) => e[0]);
};

const insert = async (Dados) => {
	return await knex.insert(Dados).into("tasks");
};

const update = async (task_id, Dados) => {
	return await knex("tasks").where({ id: task_id }).update(Dados);
};

module.exports = {
	index,
	indexMy,
	indexMyCliente,
	findOne,
	insert,
	update,
};
