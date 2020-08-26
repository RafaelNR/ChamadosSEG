const knex = require('../database/index');

module.exports = {

  getUserlogin: async (user) => {
    return await knex('users').select('id','nome','user','passwd').where('user',"=",user).limit(1).then((r) => r[0]);
  },

}