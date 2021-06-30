const knex = require("../database/index");

const index = async () => {
  return await knex
    .select(
      "id",
      "titulo",
      "descricao",
      "categoria_id",
      "sub_categoria_id",
      "created_at",
      "updated_at"
    )
    .from("modelos_chamado")
    .limit(100);
};


const all = async () => {
	return await knex
		.select(
			"modelos.id",
			"titulo",
			"descricao",
			"modelos.categoria_id as categoria_id",
			"categorias.nome as categoria",
      "modelos.sub_categoria_id as sub_categoria_id",
      "sub.nome as sub_categoria",
      "users.nome as user",
			"modelos.created_at",
			"modelos.updated_at"
		)
    .from("modelos_chamado as modelos")
    .leftJoin('users','users.id','=','modelos.user_id')
    .leftJoin('categorias', 'categorias.id','=','modelos.categoria_id')
    .leftJoin('sub_categorias as sub', 'sub.id','=','modelos.sub_categoria_id')
		.limit(100);
};

const findOne = async (ID) => {
	return await knex
		.select(
			"modelos.id",
			"titulo",
			"descricao",
			"modelos.categoria_id as categoria_id",
			"categorias.nome as categoria",
			"modelos.sub_categoria_id as sub_categoria_id",
			"sub.nome as sub_categoria",
			"users.nome as user",
			"modelos.created_at",
			"modelos.updated_at"
		)
		.from("modelos_chamado as modelos")
		.leftJoin("users", "users.id", "=", "modelos.user_id")
		.leftJoin("categorias", "categorias.id", "=", "modelos.categoria_id")
		.leftJoin(
			"sub_categorias as sub",
			"sub.id",
			"=",
			"modelos.sub_categoria_id"
		)
		.where("modelos.id", "=", ID)
		.then(e => e[0])
};

const insert = (Dados) => {
	return knex.insert(Dados).into("modelos_chamado");
};

const update = (Dados) => {
	return knex("modelos_chamado").where({ id: Dados.id }).update(Dados);
};

const deletar = async (ID) => {
	return await knex("modelos_chamado").del().where("id", "=", ID);
};


module.exports = {
	index,
	all,
  findOne,
  insert,
	update,
	deletar
};