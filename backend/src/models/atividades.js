const knex = require("../database/index");

const findOneByData = async (Params) => {
	let Dados = "";
	let query = knex
		.select(
			"atividades.id",
			"atividades.ticket",
			"atividades.date",
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
		.orderBy("info.id")
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
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.orderBy("atividades.id", "desc")
			.orderBy("atividades.date", "desc")
			.limit(60);
	},

	findAllByClientes: async (user_id) => {

		return await knex
			.select(
				"a.id",
				"a.ticket",
				"a.date",
				"c.nome_fantasia as cliente",
				"u.nome as técnico",
				"a.created_at",
				"a.updated_at"
			)
			.from("atividades as a")
			.leftJoin("users as u", "u.id", "=", "a.user_id")
			.leftJoin("clientes as c", "c.id", "=", "a.cliente_id")
			.whereIn("a.cliente_id", function () {
				this.select("cliente_id")
					.from("cliente_has_user as chu")
					.where("chu.user_id", "=", user_id);
			})
			.orderBy("a.id", "desc")
			.orderBy("a.date", "desc")
			.limit(60);

	},

	findByUser_id: async (user_id) => {
		return await knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("users.id", "=", user_id)
			.orderBy("atividades.id", "desc")
			.orderBy("atividades.date", "desc")
			.limit(60);
	},

	findByClient_id: async (client_id) => {
		return await knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("clientes.id", "=", client_id)
			.orderBy("atividades.id", "desc")
			.orderBy("atividades.date", "desc")
			.limit(60);
	},

	findOne: async (ID) => {
		return knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("atividades.id", "=", ID)
			.then((Atividade) => {
				if (Atividade.length <= 0) return false;

				return knex
					.select(
						"info.id",
						"descricao",
						"info.info_ticket",
						"categorias.nome as categoria",
						"categorias.id as categoria_id",
						"info.created_at",
						"info.updated_at"
					)
					.from("infos_atividades as info")
					.join("categorias", "categorias.id", "=", "info.categoria_id")
					.join("users", "users.id", "=", "info.user_id")
					.where("info.atividade_id", "=", Atividade[0].id)
					.orderBy("info.id")
					.then((infos) => {
						return {
							...Atividade[0],
							infos,
						};
					});
			});
	},

	findOneByTicket: async (ticket) => {
		return knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.id as cliente_id",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("atividades.ticket", "=", ticket)
			.then((Atividade) => {
				if (Atividade.length <= 0) return false;

				return knex
					.select(
						"info.id",
						"descricao",
						"info.info_ticket",
						"users.nome as técnico",
						"categorias.nome as categoria",
						"categorias.id as categoria_id",
						"info.created_at",
						"info.updated_at"
					)
					.from("infos_atividades as info")
					.join("categorias", "categorias.id", "=", "info.categoria_id")
					.join("users", "users.id", "=", "info.user_id")
					.where("info.atividade_id", "=", Atividade[0].id)
					.orderBy("info.id")
					.then((infos) => {
						return {
							...Atividade[0],
							infos,
						};
					});
			});
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
			.limit(1)
			.then((e) => e[0].id);
	},

	/**
	 * Conta quantas atividades já foram abertas para o cliente
	 * @param {number} clientID
	 * @return {number}
	 */
	countActivityforClient: async (clientID) => {
		return await knex
			.count("id as id")
			.from("atividades")
			.where("cliente_id", "=", clientID)
			.limit(1)
			.then((e) => e[0].id);
	},

	countAtividadeByID: async (ID) => {
		return await knex
			.count("id as id")
			.from("atividades")
			.where("id", "=", ID)
			.limit(1)
			.then((e) => e[0].id);
	},

	countAtividadeByTicket: async (ticket) => {
		return await knex
			.count("ticket as ticket")
			.from("atividades")
			.where("ticket", "=", ticket)
			.limit(1)
			.then((e) => e[0].ticket);
	},

	insert: (Dados) => {
		return knex.insert(Dados).into("atividades");
	},

	update: (Dados) => {
		return knex("atividades").where({ id: Dados.id }).update(Dados);
	},

	deletar: async (ID) => {
		await knex("atividades").del().where("id", "=", ID).limit(1);
	},
};
