const knex = require("../database");


const registerEmail = (Dados) => {
  return knex('logs_emails').insert(Dados)
}


const updateResend = (Dados) => {
  return knex('logs_emails')
    .update({ ...Dados,updated_at: knex.fn.now() })
    .where('id', '=', Dados.id)
}


module.exports = {
	registerEmail,
	updateResend,
};