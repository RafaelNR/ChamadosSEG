const knex = require("../database");


const findOneByHash = (Hash) => {
  return knex
		.select(
			"id",
			"email",
			"hash",
			"ip_remote",
			"sent_at",
			"used_at",
			"created_at",
			"updated_at"
		)
		.from("recover_passwd")
		.where("hash", "=", Hash)
		.limit(1)
		.then((e) => e[0]);
}

const emailSendAt = (ID) => {
	return knex("recover_passwd")
		.update({ sent_at: knex.fn.now() })
		.where("id", "=", ID);
}

module.exports = {
	findOneByHash,
	emailSendAt,
};