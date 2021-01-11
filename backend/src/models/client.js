const knex = require("../database/index");
const ClientsHasUser = require("./clients_has_users");

/**
 * Retorna dados de um cliente,
 * @param {number} ID
 * @return {?Object}
 */
const findOne = async (ID) => {
	return await knex
		.select(
			"id",
			"razao_social",
			"nome_fantasia",
			"cnpj_cpf",
			"email",
			"telefone",
			"representante",
			"n_contrato",
			"created_at",
			"updated_at"
		)
		.from("clientes")
		.where("id", "=", ID)
		.limit(1)
		.then(async (Client) => {
			return Client[0]
				? { ...Client[0], usuarios: await ClientsHasUser.findUsers(ID) }
				: null;
		});
};

module.exports = {
	findOne,

	/**
	 * Retorna dados de todos os clients;
	 * @return {?Object}
	 */
	index: async () =>
		await knex
			.select(
				"id",
				"razao_social",
				"nome_fantasia",
				"cnpj_cpf",
				"email",
				"telefone",
				"representante",
				"n_contrato",
				"created_at",
				"updated_at"
			)
			.from("clientes")
			.orderBy("nome_fantasia"),

	/**
	 * Insere um novo client;
	 * @param {Object} Dados
	 * @return {number}
	 */
	insert: async (Dados) => {
		return await knex.insert(Dados).into("clientes");
	},

	/**
	 * Atualiza dados esse novo cliente;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	update: async (Dados) => {
		return await knex("clientes")
			.where({ id: Dados.id })
			.update(Dados)
			.then(async () => await findOne(Dados.id))
			.catch(async (error) => {
				return { error: error && error.messagee ? error : "Erro em retornar os dados atualizados." };
			});
	},

	delete: async (ClientID) => {
		await knex("clientes").del().where("id", "=", ClientID).limit(1);
	},

	/**
	 * Verifica se existe o user ID do cliente
	 */
	countID: async (ID) => {
		return await knex
			.count("id as id")
			.from("clientes")
			.where("id", "=", ID)
			.then((e) => e[0].id);
	},
};
