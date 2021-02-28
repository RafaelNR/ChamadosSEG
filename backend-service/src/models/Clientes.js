const knex = require("../database");

const getClientes = () => {
  return knex
        .select('id','nome_fantasia','razao_social','cnpj_cpf','email','n_contrato','telefone','representante')
        .from('clientes')
        // .whereIn('clientes.id',[14,16])   
}


module.exports = {
  getClientes
}
