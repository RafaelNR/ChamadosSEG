const knex = require("../database");


const registerEmail = (Dados) => {
  return knex('logs_emails').insert(Dados)
}


module.exports = {
  registerEmail
}