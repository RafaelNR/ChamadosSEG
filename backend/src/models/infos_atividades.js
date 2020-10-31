const knex = require("../database/index");

const findOne = (ID) => {
  return knex.select(
    "info.id",
    "descricao",
    "categorias.nome as categoria",
    "users.nome as user",
    "info.created_at",
    "info.updated_at",
  )
  .from("infos_atividades as info")
  .join("categorias", "categorias.id", "=", "info.categoria_id")
  .join("users", "users.id",'=','info.user_id')
  .where("info.id", "=", ID).then(e => e[0])
}

const insert = (Dados) => {
  return knex.insert(Dados).into("infos_atividades").then(id => id[0]);
};

const update = (Dados) => {
  return knex("infos_atividades")
    .where({ id: Dados.id })
    .update(Dados)
};

const deletar = (ID) => {
  return knex.table('infos_atividades').del().where('id','=',ID);
}

module.exports = {
  findOne,
  insert,
  update,
  deletar,
}



