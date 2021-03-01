const knex = require("../database");

const getTecnicosByCliente = async (cliente_id) => {
  return knex
		.select("users.id", "users.nome")
		.from("users")
		.join("cliente_has_user", "cliente_has_user.user_id", "=", "users.id")
		.where("users.role_id", "=", 3)
		.where("cliente_has_user.cliente_id", "=", cliente_id);
}

const getTecnico = async (tecnico_id) => {
  return knex
    .select("nome","email","telefone","imagem")
    .from("users")
    .where("id", "=", tecnico_id)
    .then((e) => e[0]);
}

module.exports = {
  getTecnicosByCliente,
  getTecnico
}