const knex = require("../database/index");
const ClientsHasUser = require("./clients_has_users");

/**
 * Retorna dados de um usuário,
 * juntamente com os clients que ele representa.
 * @param {number} ID
 * @return {Object}
 */
const findOne = async (ID) => {
	const user = await knex
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

	return { ...user, clients: await ClientsHasUser.findClients(ID) };
};

module.exports = {
	findOne,

	/**
	 * Retorna dados de todos os usuários.
	 * @return {Object}
	 */
	index: async () => {
		return await knex
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
			.from("users").orderBy('nome')
	},

	/**
	 * Faz o insert dos dados do novo usuário,
	 * juntamente com os clients que ele representa.
	 * @param {Object} userDados
	 * @param {!Object} clientsUser
	 * @return {number}
	 */
	insert: async ({ userDados, clientsUser }) => {
		return await knex
			.insert(userDados)
			.into("users")
			.then((ID) => {
				console.log(ID)
				// Sem Clients vinculados
				if (!clientsUser) return ID;
				// Com clients vinculados
				clientsUser.map((client) => {
					ClientsHasUser.insert({ cliente_id: client, user_id: ID[0] });
				});
				return ID;
			});
	},

	/**
	 * Faz o update dos dados do novo usuário
	 * retornando os dados atualizado desse usuário,
	 * juntamente com os clients que ele representa.
	 * @param {Object} userDados
	 * @param {Object} clientsUser
	 * @return {Object}
	 */
	update: async ({ userDados, clientsUser }) => {
		return await knex("users")
			.where({ id: userDados.id })
			.update(userDados)
			.then(async (Dados) => {
				if (!clientsUser) return Dados;

				// Remove clients antigos;
				await ClientsHasUser.delete(userDados.id)
					.then(async () => {
						// Insere novos;
						await clientsUser.map(async (client) => {
							await ClientsHasUser.insert({
								cliente_id: client,
								user_id: userDados.id,
							});
						});
					})
					.catch(() => {
						throw { error: "Erro em inserir ou deletar clients" };
					});
				return Dados;
			})
			.catch((error) => {
				throw error;
			});
	},

	/**
	 * Desabilita um usuário, removendo seus clients.
	 * @param {Object} Dados
	 * @return {Boolean}
	 */
	desabilita: async (id) => {
		return await knex("users").where({ id }).update({ actived: 0 });
	},

	/**
	 * Ativa novamente um usuário, removendo seus clients.
	 * @param {Object} Dados
	 * @return {Boolean}
	 */
	actived: async (id) => {
		return await knex("users").where({ id }).update({ actived: 1 });
	},

	/**
	 * Verifica se existe o user ID do usuário.
	 */
	countID: async (ID) => {
		return await knex
						.count("id as id")
						.from("users")
						.where("id", "=", ID)
						.then((e) => e[0].id);
	},

	getRole: async (ID) => {
		return await knex
						.count("role_id")
						.from("users")
						.where("id", "=", ID)
						.then((e) => e[0].id);
	}
};
