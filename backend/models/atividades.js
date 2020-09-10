const knex = require("../database/index");

const findOne = async (Params) => {
	let Dados = "";
	let query = knex
		.select(
			"atividades.id",
			"clientes.nome_fantasia as cliente",
			"users.nome as técnico",
			"atividades.created_at",
			"atividades.updated_at"
		)
		.from("atividades")
		.join("clientes", "clientes.id", "=", "atividades.cliente_id")
		.join("users", "users.id", "=", "atividades.user_id");

	if (Params.id) {
		Dados = await knex.raw(query + " where ?? = ?", [
			"atividades.id",
			Params.id,
		]);
	} else if (Params.userID && Params.data) {
		Dados = await knex.raw(
			query +
				" where users.id = :id AND SUBSTRING(atividades.created_at, 1, 10) = :created_at",
			{
				id: Params.userID,
				created_at: Params.data,
			}
		);
	} else if (Params.clientID && Params.data) {
		Dados = await knex.raw(
			query +
				" where clientes.id = :id AND SUBSTRING(atividades.created_at, 1, 10) = :created_at",
			{
				id: Params.clientID,
				created_at: Params.data,
			}
		);
	}

	// Pegas as informações das atividades
	const Atividade = Dados[0][0];

	// Não existe atividades;
	if (!Atividade) return false;

	return await knex
		.select(
			"info.id",
			"descricao",
			"categorias.nome as categoria",
			"info.created_at",
			"info.updated_at"
		)
		.from("info_atividades as info")
		.join("categorias", "categorias.id", "=", "info.categoria_id")
		.where("info.atividade_id", "=", Atividade.id)
		.then((info) => {
			return {
				...Atividade,
				info,
			};
		});
};

module.exports = {
	findOne,

	index: async () => {
		return await knex
			.select(
				"atividades.id",
				"clientes.nome_fantasia as cliente",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.limit(100);
	},

	/**
	 * Pega atividade do meu usuario
	 * @param {number} client_id
	 * @return {object}
	 */
	indexMy: async (user_id) => {
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
			.where("users.id", "=", user_id)
			.limit(100);
	},

	/**
	 * Pega atividade de um cliente
	 * @param {number} client_id
	 * @return {object}
	 */
	indexMyCliente: async (client_id) => {
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
			.where("clientes.id", "=", client_id)
			.limit(100);
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
