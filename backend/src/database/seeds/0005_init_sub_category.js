exports.seed = (knex) => {
	return knex("sub_categorias")
		.del()
		.then(() => {
			return knex("sub_categorias").insert([
				{
					nome: "Suporte",
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					nome: "Liberação total",
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					nome: "Liberação de site outro aplicativo",
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
