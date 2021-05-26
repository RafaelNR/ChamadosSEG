exports.seed = (knex) => {
	return knex("cliente_has_user")
		.del()
		.then(() => {
			return knex("cliente_has_user").insert([
				{ cliente_id: 1, user_id: 1 },
				{ cliente_id: 2, user_id: 1 },
				{ cliente_id: 2, user_id: 2 },
			]);
		});
};
