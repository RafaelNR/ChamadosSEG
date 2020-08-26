const knex = require("../database/index");

module.exports = {
	/**
	 * Procura clients vinculado a um userID
	 * @param {number} userID
	 * @return {Object}
	 */
	findClients: async (userID) => {
		return await knex
			.select("id", "razao_social", "nome_fantasia", "cnpj_cpf", "email")
			.from("cliente_has_user")
			.join("clientes", "id", "=", "cliente_id")
			.where("cliente_has_user.user_id", "=", userID);
	},
	/**
	 * Procura usuários vinculado a um clientID
	 * @param {number} clientID
	 * @return {Object}
	 */
	findUsers: async (clientID) => {
		return await knex
			.select("id", "nome", "user")
			.from("cliente_has_user")
			.join("users", "id", "=", "user_id")
			.where("cliente_has_user.cliente_id", "=", clientID);
	},

	countClientByUser: async (userID, clientID) => {
		return await knex
			.count("id as id")
			.from("cliente_has_user")
			.join("clientes", "id", "=", "cliente_id")
			.where("cliente_has_user.user_id", "=", userID)
			.andWhere("cliente_has_user.cliente_id", "=", clientID)
			.then((e) => e[0].id);
	},

	/**
	 * Conta se o clientID está vinculado a algum usuário.
	 * @param {number} ClientID
	 * @return {number}
	 */
	countLinkedToClient: async (ClientID) => {
		return await knex
			.count("cliente_id as cliente_id")
			.from("cliente_has_user")
			.where("cliente_id", "=", ClientID)
			.then((e) => e[0].cliente_id);
	},

	insert: async (Dados) => await knex.insert(Dados).into("cliente_has_user"),

	delete: async (userID) =>
		await knex("cliente_has_user").where({ user_id: userID }).del(),
};
