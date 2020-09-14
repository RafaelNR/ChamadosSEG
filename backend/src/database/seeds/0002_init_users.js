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
					telefone: "(32) 00000-00000",
					actived: 1,
					role_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					nome: "Rafael Rodrigues2",
					user: "rafaelnetto2",
					passwd:
						"$2a$10$Aj5JrHyP99jSwaZkA7Mk7eVFQWQ7mLcgct7HWKlBwBiH3E2y13lSG",
					email: "rafael.r2@seg.eti.br",
					telefone: "(32) 00000-00001",
					actived: 1,
					role_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
