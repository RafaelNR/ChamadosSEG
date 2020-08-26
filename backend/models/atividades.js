const knex = require("../database/index");

const findOne = async (Params) => {
	if (Params.id) {
		return await knex
			.select(
				"atividades.id",
				"clientes.nome_fantasia",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at",
				"atividades"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("atividades.id", "=", Params.id)
			.then((e) => e[0]);
	} else if (Params.userID && Params.data) {
		return await knex
			.select(
				"atividades.id",
				"clientes.nome_fantasia",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at",
				"atividades"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("users.id", "=", Params.userID)
			.andWhereRaw(`SUBSTRING(atividades.created_at, 1, 10) = '${Params.data}'`)
			.then((e) => e[0]);
	} else if (Params.clientID && Params.data) {
		return await knex
			.select(
				"atividades.id",
				"clientes.nome_fantasia",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at",
				"atividades"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("clientes.id", "=", Params.clientID)
			.andWhereRaw(`SUBSTRING(atividades.created_at, 1, 10) = '${Params.data}'`)
			.then((e) => e[0]);
	}
};

module.exports = {
	findOne,

	index: async () => {
		return await knex
			.select(
				"atividades.id",
				"clientes.nome_fantasia",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.limit(100);
	},

	indexMy: async (Dados) => {
		if (Dados.client) {
			return await knex
				.select(
					"atividades.id",
					"clientes.nome_fantasia",
					"users.nome as técnico",
					"atividades.created_at",
					"atividades.updated_at"
				)
				.from("atividades")
				.join("clientes", "clientes.id", "=", "atividades.cliente_id")
				.join("users", "users.id", "=", "atividades.user_id")
				.where("clientes.id", "=", Dados.client)
				.limit(100);
		} else if (Dados.userID) {
			return await knex
				.select(
					"atividades.id",
					"clientes.nome_fantasia",
					"users.nome as técnico",
					"atividades.created_at",
					"atividades.updated_at"
				)
				.from("atividades")
				.join("clientes", "clientes.id", "=", "atividades.cliente_id")
				.join("users", "users.id", "=", "atividades.user_id")
				.where("users.id", "=", Dados.userID)
				.limit(100);
		}
	},

	/**
	 * Conta quantos chamados tem aberto para aquele usuário na data.
	 * @param {number} user_id
	 * @param {number} client_id
	 * @param {string} data
	 * @return {number}
	 */
	countByUserClient: async ({ user_id, cliente_id, created_at }) => {
		const newDate = new Date(created_at).toISOString().slice(0, 10);

		return await knex
			.count("id as id")
			.from("atividades")
			.where("user_id", "=", user_id)
			.andWhere("cliente_id", "=", cliente_id)
			.andWhereRaw(`SUBSTRING(created_at, 1, 10) like '%${newDate}%'`);
	},

	/**
	 * Conta quantas atividades está aberta para o client
	 * @param {number} clientID
	 * @return {number}
	 */
	countActivityforClient: async (clientID) => {
		return await knex
			.count("id as id")
			.from("atividades")
			.where("cliente_id", "=", clientID)
			.then((e) => e[0].id);
	},

	insert: async (Dados) => {
		return await knex.insert(Dados).into("atividades");
	},

	/**
	 * Atualiza dados das atividades;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	update: async (Dados) => {
		return await knex("atividades")
			.where({ id: Dados.id })
			.update(Dados)
			.then(async () => await findOne(Dados))
			.catch(async (error) => {
				console.log(error);
				return { error: "Erro em retornar os dados atualizados." };
			});
	},
};
