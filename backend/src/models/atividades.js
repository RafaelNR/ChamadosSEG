const knex = require("../database/index");


const getQueryType = (query,period) => {
	let newQuery = query;

	switch (period) {
		case "open":
			return newQuery
				.andWhereRaw("date > DATE_FORMAT(now() - INTERVAL 10 DAY , '%Y-%m-%d')")
				.andWhereRaw("MONTH(NOW()) = MONTH(date)");

		case "close":
			return newQuery.andWhereRaw(
				"date < DATE_FORMAT(now() - INTERVAL 10 DAY , '%Y-%m-%d')"
			);

		case "last":
			return newQuery
				.andWhereRaw("date = DATE_FORMAT(now() - INTERVAL 9 DAY , '%Y-%m-%d')")
				.andWhereRaw("MONTH(NOW()) = MONTH(date)");

		case "half":
			return newQuery
				.andWhereRaw("date = DATE_FORMAT(now() - INTERVAL 5 DAY , '%Y-%m-%d')")
				.andWhereRaw("MONTH(NOW()) = MONTH(date)");
		
		default:
			return newQuery;
	}

}

const findOneByData = async (Params) => {
	let Dados = "";
	let query = knex
		.select(
			"atividades.id",
			"atividades.ticket",
			"atividades.date",
			"clientes.nome_fantasia as cliente",
			"users.nome as tecnico",
			"users.id as tecnico_id",
			"atividades.created_at",
			"atividades.updated_at"
		)
		.from("atividades")
		.join("clientes", "clientes.id", "=", "atividades.cliente_id")
		.join("users", "users.id", "=", "atividades.user_id")

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

	index: async (period = null) => {
		let query = knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id");

		query = getQueryType(query,period);

		return await query.orderBy("atividades.date", "desc").limit(100);
	},

	filter: ({ data_inicial, data_final, cliente, tecnico }) => {
		let query = knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id");

			if (
				data_inicial &&
				data_final &&
				cliente &&
				tecnico
			) {
				query
					.whereBetween("atividades.date", [data_inicial, data_final])
					.andWhere("users.id", "=", tecnico)
					.andWhere("clientes.id", "=", cliente);
			} else if (data_inicial && data_final && cliente) {
				query
					.whereBetween("date", [data_inicial, data_final])
					.andWhere("cliente.id", "=", cliente);
			} else if (data_inicial && data_final && tecnico) {
				query
					.whereBetween("date", [data_inicial, data_final])
					.andWhere("users.id", "=", tecnico)
			} else if (data_inicial && data_final) {
				query.whereBetween("atividades.date", [data_inicial, data_final])

			} else if(tecnico && cliente) {
				query.where("clientes.id", "=", cliente).andWhere('users.id','=',tecnico)
			} else if (cliente) {
				query.where("clientes.id", "=", cliente);
			} else if (tecnico) {
				query.where("users.id", "=", tecnico);
			}

			return query.orderBy("atividades.date", "desc")
	},

	findAll: async (type = null) => {
		let query = knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id");

		query = getQueryType(query,type);

		return await query.orderBy("atividades.date", "desc").limit(100);
	},

	findAllByClientes: async (user_id, type = null) => {
		let query = knex
			.select(
				"a.id",
				"a.ticket",
				"a.date",
				"c.nome_fantasia as cliente",
				"u.nome as tecnico",
				"u.id as tecnico_id",
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
			});

		query = getQueryType(query, type);

		return await query.orderBy("a.date", "desc").limit(100);
	},

	findByUser_id: async (user_id, type=null) => {
		let query = knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("users.id", "=", user_id);

		query = getQueryType(query, type);

		return await query
			.orderBy("atividades.id", "desc")
			.orderBy("atividades.date", "desc")
			.limit(100);
	},

	findByClient_id: async (client_id, type = null) => {
		let query = knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("clientes.id", "=", client_id);

		query = getQueryType(query, type);

		return await query.orderBy("atividades.date", "desc").limit(100);
	},

	findOne: async (ID) => {
		return knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
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
				"users.nome as tecnico",
				"users.id as tecnico_id",
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
	 * Todas minhas atividades editais
	 * @param {number} user_id
	 */
	findMyOpen: async (user_id, type = null) => {
		let query = knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("atividades.user_id", "=", user_id);

		if (type === "open") {
			query.andWhereRaw(
				"date > DATE_FORMAT(now() - INTERVAL 10 DAY , '%Y-%m-%d')"
			);
		}

		return await query
			.orderBy("atividades.id", "desc")
			.orderBy("atividades.date", "desc");
	},

	findMyClientes: async (user_id) => {
		return await knex
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"clientes.nome_fantasia as cliente",
				"users.nome as tecnico",
				"users.id as tecnico_id",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("clientes", "clientes.id", "=", "atividades.cliente_id")
			.join("users", "users.id", "=", "atividades.user_id")
			.innerJoin(
				"cliente_has_user",
				"cliente_has_user.user_id",
				"=",
				"atividades.user_id"
			)
			.whereIn("atividades.cliente_id", function () {
				this.select("cliente_id")
					.from("cliente_has_user")
					.where("user_id", "=", user_id);
			})
			.andWhereRaw(
				"AND date > DATE_FORMAT(now() - INTERVAL 10 DAY , '%Y-%m-%d')"
			);
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
