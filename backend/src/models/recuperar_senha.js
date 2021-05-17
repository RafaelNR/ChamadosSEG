const knex = require("../database/index");
const TABLE = "recover_passwd";

const findOneByEmail = async (email) => {
  return await knex
    .select("id","email","hash","ip_remote","sent_at","used_at","created_at","updated_at")
    .from(TABLE)
		.where("email", "=", email)
		.orderBy('id','desc')
		.limit(1)
    .then(e => e[0]);
}

const findOneByHash = async (hash) => {
	return await knex
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
		.from(TABLE)
		.where("hash", "=", hash)
		.limit(1)
		.orderBy("id", "desc")
		.then((e) => e[0]);
};

const insertOrder = (Dados) => {
  return knex.table(TABLE).insert(Dados).then(e => e[0]);
}

const deleteHash = (hash) => {
  return knex.del().from(TABLE).where("hash", "=", hash);
}

const registerUsedAt = (hash) => {
	return knex(TABLE)
		.update({ used_at: knex.fn.now() })
		.where("hash", "=", hash);
}

module.exports = {
	insertOrder,
	findOneByEmail,
	findOneByHash,
	deleteHash,
	registerUsedAt,
};