const knex = require("../database/index");

module.exports = {
	acessos: () => {
		return knex
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
			.innerJoin("users","users.id",'=','logs.user_id')
			.orderBy('logs.id','desc')
			.limit(200)
	},
	emails: () => {
		return knex
			.select(
				"id",
				"status",
				"error",
				"type",
				"to",
				"subject",
				"file",
				"filename",
				"created_at",
				"updated_at"
			)
			.from("logs_emails")
			.orderBy('id','desc')
			.limit(200)
	},
	insert: async (Dados) => await knex.insert(Dados).into("logs"),
};
