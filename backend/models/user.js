const knex = require("../database/index");
const ClientsHasUser = require("./clients_has_users");

/**
 * Retorna dados de um usuário,
 * juntamente com os clients que ele representa.
 * @param {number} ID
 * @return {Object}
 */
const findOne = async (ID) => {
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
		.from("users")
		.where("id", "=", ID)
		.limit(1)
		.then(async (user) => {
			return user[0]
				? { ...user[0], clients: await ClientsHasUser.findClients(ID) }
				: null;
		});
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
			.from("users");
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
			.then(async (ID) => {
				// Sem Clients vinculados
				if (!clientsUser) return ID;
				// Com clients vinculados
				return await clientsUser.map(async (client) => {
					await ClientsHasUser.insert({ cliente_id: client, user_id: ID[0] });
				});
			});
	},

	/**
	 * Faz o update dos dados do novo usuário
	 * retornando os dados atualizado desse usuário,
	 * juntamente com os clients que ele representa.
	 * @param {Object} userDados
	 * @param {!Object} clientsUser
	 * @return {Object}
	 */
	update: async ({ userDados, clientsUser }) => {
		const Dados = await knex("users")
			.where({ id: userDados.id })
			.update(userDados)
			.then(async () => {
				if (!clientsUser) return;

				// Remove clients antigos;
				return await ClientsHasUser.delete(userDados.id)
					.then(() => {
						// Insere novos;
						return clientsUser.map(async (client) => {
							await ClientsHasUser.insert({
								cliente_id: client,
								user_id: userDados.id,
							});
						});
					})
					.catch((error) => {
						console.log(error);
						throw { error: "Erro em inserir clients novos." };
					});
			})
			.catch((error) => {
				console.log(error);
				throw { error: "Erro em deletar clients antigos." };
			});

		/* Resolve todoas funções */
		return Promise.all(Dados)
			.then(async () => await findOne(userDados))
			.catch((error) => {
				console.log(error);
				throw { error: "Erro em retornar os dados atualizados." };
			});
	},

	/**
	 * Desabilita um usuário, removendo seus clients.
	 * @param {Object} Dados
	 * @return {Boolean}
	 */
	desabilita: async (Dados) => {
		return await knex("users")
			.where({ id: Dados.id })
			.update({ actived: 0 })
			.then(async () => {
				await ClientsHasUser.delete(Dados.id);
			})
			.catch((error) => {
				console.log(error);
				throw { error: "Erro em remover clients." };
			});
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
};
