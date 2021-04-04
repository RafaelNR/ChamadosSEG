const knex = require('../database/index');

module.exports = {

  login : async (user) => {
    return await knex("users")
			.select("id", "nome", "actived", "user", "passwd")
			.where("user", "=", user)
			.limit(1)
			.then((r) => r[0]);
  },

}