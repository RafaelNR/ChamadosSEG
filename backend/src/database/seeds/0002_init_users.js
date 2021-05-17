exports.seed = (knex) => {
	return knex("users")
		.del()
		.then(() => {
			return knex("users").insert([
				{
					nome: "Rafael Rodrigues",
					user: "rafaelnetto",
					passwd:
						"$2a$10$Aj5JrHyP99jSwaZkA7Mk7eVFQWQ7mLcgct7HWKlBwBiH3E2y13lSG",
					email: "rafael.r@seg.eti.br",
					telefone: "(32) 00000-0000",
					actived: 1,
					role_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					nome: "Técnico Teste",
					user: "tecnico",
					passwd:
						"$2a$10$Aj5JrHyP99jSwaZkA7Mk7eVFQWQ7mLcgct7HWKlBwBiH3E2y13lSG",
					email: "fred@seg.eti.br",
					telefone: "(32) 00000-0001",
					actived: 1,
					role_id: 2,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
