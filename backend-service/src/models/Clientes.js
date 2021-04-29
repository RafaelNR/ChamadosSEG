const knex = require("../database");

const getClientes = async () => {
	return knex
		.select(
			"id",
			"nome_fantasia",
			"razao_social",
			"cnpj_cpf",
			"email",
			"n_contrato",
			"telefone",
			"representante"
		)
		.from("clientes");
	// .whereIn('clientes.id',[14,16])
};

const getClientesComAtividade = async (Mes) => {

  return knex
    .select(
      "nome_fantasia",
      "razao_social",
      "cnpj_cpf",
      "email",
      "n_contrato",
      "telefone",
      "representante"
    )
    .distinct("clientes.id")
    .from("clientes")
    .leftJoin("atividades", "atividades.cliente_id", "=", "clientes.id")
    .whereRaw(`MONTH(date) = ${Mes}`)
    .andWhere('actived', '=', 1);
};

const getCliente = async (cliente_id) => {
	return knex
		.select(
			"id",
			"nome_fantasia",
			"razao_social",
			"cnpj_cpf",
			"email",
			"n_contrato",
			"telefone",
			"representante"
		)
		.from("clientes")
		.where("id", "=", cliente_id)
		.then((e) => e[0]);
};

const getClientesByTecnico = async (tecnico_id) => {
	return knex
		.select("nome_fantasia as nome", "representante", "email")
		.from("cliente_has_user as cs")
		.innerJoin("clientes as cliente", "cliente.id", "=", "cs.cliente_id")
		.where("cs.user_id", "=", tecnico_id);
};

module.exports = {
	getClientesByTecnico,
  getClientesComAtividade,
	getClientes,
	getCliente,
};
