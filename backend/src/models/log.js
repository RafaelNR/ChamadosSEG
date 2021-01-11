const knex = require("../database/index");

module.exports = {
	index: async () => {
		return await knex
			.select(
				"logs.id",
				"logs.type",
				"logs.category",
				"logs.error",
				"users.nome",
				"users.user",
				"logs.created_at",
				"logs.updated_at"
			)
			.from("logs")
			.leftJoin("users","users.id",'=','logs.user_id')
			.orderBy('logs.id','desc')
			.limit(200)
	},
	insert: async (Dados) => await knex.insert(Dados).into("logs"),
};
