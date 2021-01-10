exports.seed = (knex) => {
	return knex("categorias")
		.del()
		.then(() => {
			return knex("categorias").insert([
				{
					id: 1,
					nome: "Ironvox",
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 2,
					nome: "Firewall",
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 3,
					nome: "Suporte",
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
