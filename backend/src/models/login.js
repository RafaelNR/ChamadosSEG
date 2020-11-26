const knex = require('../database/index');

module.exports = {

  login : async (user) => {
    return await knex('users').select('id','nome','user','passwd').where('user',"=",user).limit(1).then((r) => r[0]);
  },


  getDataAfterLogin: (ID) => {
    return knex
      .select(
        "id",
        "nome",
        "user",
        "email",
        "telefone",
        "actived",
        "last_acess",
        "role_id",
        "created_at",
        "updated_at"
      )
      .from("users")
      .where("id", "=", ID)
      .limit(1)
      .then((user) => user[0]);
  }



}