const knex = require("../database");


const findOneByHash = (Hash) => {
  return knex
		.select(
			"id",
			"user_email",
			"hash",
			"access_code",
			"ip_remote",
			"send_at",
			"created_at",
			"updated_at"
		)
		.from("recover_passwd")
		.where("hash", "=", Hash)
		.limit(1)
		.then((e) => e[0]);
}

const insertSendAt = (ID) => {
  knex('recover_passwd').insert({send_at: knex.fn.now()}).where('id',"=",ID)
}

module.exports = {
	findOneByHash,
	insertSendAt,
};