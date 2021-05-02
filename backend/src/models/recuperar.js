const knex = require("../database/index");


const findOneByEmail = (email) => {
  return knex
    .select("id","user_email","hash","access_code","ip_remote","send_at","created_at","updated_at")
    .from("recover_passwd")
    .where("user_email", "=", email)
    .limit(1)
    .then(e => e[0]);
}

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
};

const insertOrder = async (Dados) => {
  console.log(Dados);
  // return knex.table('recover_passwd').insert(Dados).then(e => e[0]);
  return 7;
}

const deleteHash = (Hash) => {
  return knex.del().from("recover_passwd").where("hash", "=", Hash);
}

const delAll = () => {
  return knex.del().from("recover_passwd");
}

module.exports = {
	insertOrder,
	findOneByEmail,
	findOneByHash,
  deleteHash,
  delAll
};