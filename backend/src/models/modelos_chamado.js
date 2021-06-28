const knex = require("../database/index");

const index = async () => {
  return await knex
    .select(
      "modelos.id as id",
      "titulo",
      "descricao",
      "categoria_id",
      "sub_categoria_id",
      "nome",
      "modelos.created_at as created_at",
      "modelos.updated_at as updated_at"
    )
    .from("modelos_chamado as modelos")
    .leftJoin("users", "users.id", "=", "modelos.user_id")
    .limit(100);
};


module.exports = {
  index
}