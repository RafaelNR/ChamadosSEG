const knex = require("../database");


const registerEmail = (Dados) => {
  return knex('send_emails').insert(Dados)
}

module.exports = {
  registerEmail
}