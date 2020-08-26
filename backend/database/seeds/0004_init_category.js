exports.seed = (knex) => {
	return knex("categorias")
		.del()
		.then(() => {
			return knex("categorias").insert([
				{
					id: 0,
					nome: "Suporte",
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
