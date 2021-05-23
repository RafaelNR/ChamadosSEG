const knex = require("../database/index");

const findOneByChamadoID = (chamado_id) => {
  return knex
    .select('*')
    .from('acm_chamados')
    .innerJoin('users','users.id','=','acm_chamados.user_id')
    .where('chamados_id','=',chamado_id)
}

const findOne = (id) => {
	return knex
		.select("*")
		.from("acm_chamados")
    .where("id", "=", id)
    .then(e => e[0])
};


const insert = (Dados) => {
  return knex.insert(Dados).into("acm_chamados");
}

const update = (Dados) => {
	return knex("acm_chamados").where({ id: Dados.id }).update(Dados);
};

module.exports = {
	findOne,
	findOneByChamadoID,
	insert,
	update,
};