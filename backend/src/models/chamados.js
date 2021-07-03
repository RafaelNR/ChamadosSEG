const knex = require("../database/index");

const commonQuery = () => {
	return knex
		.select(
			"chamados.id",
			"user.nome as requerente",
			"user.imagem as requerente_imagem",
			"chamados.requerente as requerente_id",
			"tecnico.nome as atribuido",
			"tecnico.imagem as atribuido_imagem",
			"chamados.atribuido as atribuido_id",
			"cliente.nome_fantasia as cliente",
			"chamados.cliente_id as cliente_id",
			"categorias.id as categoria_id",
			"categorias.nome as categoria",
			"sub_categorias.id as sub_categoria_id",
			"sub_categorias.nome as sub_categoria",
			"chamados.titulo",
			"chamados.descricao",
			"chamados.status",
			"chamados.prioridade",
			"chamados.created_at",
			"chamados.updated_at"
		)
		.from("chamados")
		.innerJoin("users as user", "user.id", "=", "chamados.requerente")
		.innerJoin("users as tecnico", "tecnico.id", "=", "chamados.atribuido")
		.innerJoin("clientes as cliente", "cliente.id", "=", "chamados.cliente_id")
		.innerJoin("categorias", "categorias.id", "=", "chamados.categoria_id")
		.innerJoin(
			"sub_categorias",
			"sub_categorias.id",
			"=",
			"chamados.sub_categoria_id"
		);
}

const index = () => {
	return commonQuery().limit(50).orderBy("chamados.id", "desc");
};

const requerentesByUserID = (user_id) => {
	return commonQuery()
		.where("chamados.requerente", "=", user_id)
		.andWhere("chamados.status", "<>", 'Finalizado')
		.limit(50)
		.orderBy("chamados.id", "desc");
};

const atribuidosByUserID = (user_id) => {
	return commonQuery()
		.where("chamados.atribuido", "=", user_id)
		.andWhere("chamados.status", "<>", "Finalizado")
		.limit(50)
		.orderBy("chamados.id", "desc");
};

const indexMyCliente = (cliente_id) => {
	return commonQuery()
		.where("chamados.atribuido", "=", cliente_id)
		.limit(50)
		.orderBy("chamados.id", "desc");
};

const findOne = (id) => {
	return commonQuery()
		.where("chamados.id", "=", id)
		.limit(1)
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

const getStatusChamado = (ID) => {
	return knex
		.select("status")
		.from("chamados")
		.where("id", "=", ID)
		.then((e) => e[0].status);
}

const countMyChamados = (user_id) => {
	return knex
		.count('id as chamados')
		.from('chamados')
		.where('requerente', '=', user_id)
		.orWhere('atribuido', '=', user_id)
		.andWhere('status', '<>', 'Finalizado')
};

const countMyRequerente = (user_id) => {
	return knex
		.count("id as requerente")
		.from("chamados")
		.where("requerente", "=", user_id)
		.andWhere("status", "<>", "Finalizado")
		.then(e => e[0]);
}
const countMyAtribuido = (user_id) => {
	return knex
		.count("id as atribuido")
		.from("chamados")
		.orWhere("atribuido", "=", user_id)
		.andWhere("status", "<>", "Finalizado")
		.then((e) => e[0]);
}

module.exports = {
	index,
	requerentesByUserID,
	atribuidosByUserID,
	indexMyCliente,
	findOne,
	insert,
	update,
	countID,
	countMyChamados,
	countMyRequerente,
	countMyAtribuido,
	getStatusChamado,
};
