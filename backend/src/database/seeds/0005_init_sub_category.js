exports.seed = (knex) => {
	return knex("sub_categorias")
		.del()
		.then(() => {
			return knex("sub_categorias").insert([
				{
					id: 0,
					nome: "Usuario",
					categoria_id: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 0,
					nome: "Teste",
					categoria_id: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 0,
					nome: "Teste",
					categoria_id: 2,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
