const knex = require("../database/index");

const lastTicket = async () => {
  return await knex
		.raw("SELECT ticket FROM atividades WHERE id = (SELECT max(id) FROM atividades);")
}

const lastInfoTicket = async (atividade_id) => {
	return await knex.raw(
		`SELECT info_ticket FROM infos_atividades WHERE id = (SELECT max(id) FROM infos_atividades where atividade_id = ${atividade_id});`
	);
};


module.exports = {
  lastTicket,
  lastInfoTicket
}