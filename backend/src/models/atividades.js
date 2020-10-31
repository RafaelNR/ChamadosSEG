const knex = require("../database/index");

const findOneByData = async (Params) => {
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
		.from("infos_atividades as info")
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
	findOneByData,

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

	findByUser_id: async (user_id) => {
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

	findByClient_id: async (client_id) => {
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

	findOne: (ID) => {
		return knex
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
		.where("atividades.id",'=', ID)
		.then(Atividade => {

			if(Atividade.length <= 0) return false;

			return knex.select(
				"info.id",
				"descricao",
				"categorias.nome as categoria",
				"info.created_at",
				"info.updated_at",
			)
			.from("infos_atividades as info")
			.join("categorias", "categorias.id", "=", "info.categoria_id")
			.where("info.atividade_id", "=", Atividade[0].id)
			.then(infos => {
				return {
					...Atividade[0],
					infos
				}
			})

		})

	},

	/**
	 * Conta quantos chamados tem aberto para aquele usuário na data.
	 * @param {number} user_id
	 * @param {number} client_id
	 * @param {string} date
	 * @return {number}
	 */
	countByUserClientDate: async ({ user_id, cliente_id, date }) => {

		return await knex
			.count("id as id")
			.from("atividades")
			.where("user_id", "=", user_id)
			.andWhere("cliente_id", "=", cliente_id)
			.andWhere("date", "=", date)
	},

	/**
	 * Conta quantas atividades foram aberta para o client
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

	insert: (Dados) => {
		return knex.insert(Dados).into("atividades");
	},

	update: (Dados) => {
		return knex("atividades")
			.where({ id: Dados.id })
			.update(Dados)
	},

	deletar: async (ID) => {
		await knex("atividades").del().where("id", "=",ID).limit(1);
	},
};
