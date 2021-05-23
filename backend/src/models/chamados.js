const knex = require("../database/index");

const index = async () => {
	return await knex
		.select(
			"chamados.id",
			"user.nome as requerente",
			"chamados.tecnico_requerente as requerente_id",
			"tecnico.nome as atribuido",
			"chamados.tecnico_atribuido as tecnico_id",
			"cliente.nome_fantasia as cliente",
			"chamados.cliente_atribuido as cliente_id",
			"chamados.status",
			"chamados.prioridade",
			"chamados.created_at",
			"chamados.updated_at"
		)
		.from("chamados")
		.innerJoin("users as user", "user.id", "=", "chamados.tecnico_requerente")
		.innerJoin(
			"users as tecnico",
			"tecnico.id",
			"=",
			"chamados.tecnico_atribuido"
		)
		.innerJoin(
			"clientes as cliente",
			"cliente.id",
			"=",
			"chamados.cliente_atribuido"
		)
		.limit(200)
		.orderBy("chamados.id", "asc");
};

const requerentesByUserID = async (user_id) => {
	return await knex
		.select(
			"chamados.id",
			"user.nome as requerente",
			"chamados.tecnico_requerente as requerente_id",
			"tecnico.nome as atribuido",
			"chamados.tecnico_atribuido as tecnico_id",
			"cliente.nome_fantasia as cliente",
			"chamados.cliente_atribuido as cliente_id",
			"chamados.status",
			"chamados.prioridade",
			"chamados.created_at",
			"chamados.updated_at"
		)
		.from("chamados")
		.innerJoin("users as user", "user.id", "=", "chamados.tecnico_requerente")
		.innerJoin(
			"users as tecnico",
			"tecnico.id",
			"=",
			"chamados.tecnico_atribuido"
		)
		.innerJoin(
			"clientes as cliente",
			"cliente.id",
			"=",
			"chamados.cliente_atribuido"
		)
		.where("chamados.tecnico_requerente",'=',user_id)
		.limit(200)
		.orderBy("chamados.id", "asc");
};

const atribuidosByUserID = async (user_id) => {
	return await knex
		.select(
			"chamados.id",
			"user.nome as requerente",
			"chamados.tecnico_requerente as requerente_id",
			"tecnico.nome as atribuido",
			"chamados.tecnico_atribuido as tecnico_id",
			"cliente.nome_fantasia as cliente",
			"chamados.cliente_atribuido as cliente_id",
			"chamados.status",
			"chamados.prioridade",
			"chamados.created_at",
			"chamados.updated_at"
		)
		.from("chamados")
		.innerJoin("users as user", "user.id", "=", "chamados.tecnico_requerente")
		.innerJoin(
			"users as tecnico",
			"tecnico.id",
			"=",
			"chamados.tecnico_atribuido"
		)
		.innerJoin(
			"clientes as cliente",
			"cliente.id",
			"=",
			"chamados.cliente_atribuido"
		)
		.where("chamados.tecnico_atribuido", "=", user_id)
		.limit(200)
		.orderBy("chamados.id", "asc");
};

const indexMyCliente = async (cliente_id) => {
	return await knex
		.select(
			"chamados.id",
			"user.nome as requerente",
			"chamados.tecnico_requerente as requerente_id",
			"tecnico.nome as atribuido",
			"chamados.tecnico_atribuido as tecnico_id",
			"cliente.nome_fantasia as cliente",
			"chamados.cliente_atribuido as cliente_id",
			"chamados.status",
			"chamados.prioridade",
			"chamados.created_at",
			"chamados.updated_at"
		)
		.from("chamados")
		.innerJoin("users as user", "user.id", "=", "chamados.tecnico_requerente")
		.innerJoin(
			"users as tecnico",
			"tecnico.id",
			"=",
			"chamados.tecnico_atribuido"
		)
		.innerJoin(
			"clientes as cliente",
			"cliente.id",
			"=",
			"chamados.cliente_atribuido"
		)
		.where("chamados.cliente_atribuido", "=", cliente_id)
		.limit(200)
		.orderBy("chamados.id", "asc");
};

const findOne = async (id) => {
	return await knex
		.select(
			"chamados.id",
			"user.nome as requerente",
			"chamados.tecnico_requerente as requerente_id",
			"tecnico.nome as atribuido",
			"chamados.tecnico_atribuido as tecnico_id",
			"cliente.nome_fantasia as cliente",
			"chamados.cliente_atribuido as cliente_id",
			"chamados.status",
			"chamados.prioridade",
			"chamados.created_at",
			"chamados.updated_at"
		)
		.from("chamados")
		.innerJoin("users as user", "user.id", "=", "chamados.tecnico_requerente")
		.innerJoin(
			"users as tecnico",
			"tecnico.id",
			"=",
			"chamados.tecnico_atribuido"
		)
		.innerJoin(
			"clientes as cliente",
			"cliente.id",
			"=",
			"chamados.cliente_atribuido"
		)
		.where("chamados.id", "=", id)
		.limit(200)
		.orderBy("chamados.id", "asc")
		.then((e) => e[0]);
};

const insert = (Dados) => {
	return knex.insert(Dados).into("chamados");
};

const update = (Dados) => {
	return knex("chamados").where({ id: Dados.id }).update(Dados);
};

const countID = async (ID) => {
	return await knex
		.count("id as id")	
		.from("chamados")
		.where("id", "=", ID)
		.then((e) => e[0].id);
};

module.exports = {
	index,
	requerentesByUserID,
	atribuidosByUserID,
	indexMyCliente,
	findOne,
	insert,
	update,
	countID,
};
