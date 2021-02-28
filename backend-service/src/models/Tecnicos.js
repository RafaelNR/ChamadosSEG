const knex = require("../database");

const getTecnicosByCliente = (cliente_id) => {
  return knex.select('users.id','users.nome').from('users')
            .join('cliente_has_user','cliente_has_user.user_id','=','users.id')
            .where('cliente_has_user.cliente_id','=',cliente_id);
}

module.exports = {
  getTecnicosByCliente
}