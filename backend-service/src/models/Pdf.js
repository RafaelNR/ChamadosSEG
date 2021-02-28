const knex = require("../database");

const RegisterLog = (Dados) => {
	return knex("logs_pdf").insert(Dados);
};
module.exports = {
  RegisterLog
}

