const knex = require("../database/index");

const findOneByChamadoID = (chamado_id) => {
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
		.where("chamado_id", "=", chamado_id).orderBy('acm_chamados.id','desc')
		
}

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

const CountTypeAcompanhamentos = () => {
	return knex.raw(
		"select cast(sum(tipo = 1) as int) as acompanhamentos, cast(sum(tipo = 2) as int) as anexo,chamado_id from chamados left join acm_chamados ON acm_chamados.chamado_id = chamados.id where chamados.status != 'Finalizado' and tipo IS NOT NULL group by chamado_id"
	);
}

const insert = (Dados) => {
  return knex.insert(Dados).into("acm_chamados");
}

const update = (Dados) => {
	return knex("acm_chamados").where({ id: Dados.id }).update(Dados);
};

const deletar = (ID) => {
	return knex("acm_chamados").del().where('id','=',ID)
};

module.exports = {
	findOne,
	findOneByChamadoID,
	CountTypeAcompanhamentos,
	insert,
	update,
	deletar,
};