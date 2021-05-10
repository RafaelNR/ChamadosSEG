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
			.innerJoin("users", "users.id", "=", "logs.user_id")
			.orderBy("logs.id", "desc")
			.limit(200);
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
			.orderBy("id", "desc")
			.limit(200);
	},
	pdfs: () => {
		return knex
			.select(
				"logs_pdf.id",
				"status",
				"dados",
				"path",
				"erro",
				"users.nome",
				"created_at",
				"updated_at"
			)
			.from("logs_pdf")
			.innerJoin("users","logs.pdf.user_id",'=',"users.id")
			.orderBy("logs_pdf.id", "desc")
			.limit(200);
	},
	findOneEmail: (id) => {
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
			.where("id", "=", id)
			.limit(1)
			.then((e) => e[0]);
	},
	insert: async (Dados) => await knex.insert(Dados).into("logs"),
};
