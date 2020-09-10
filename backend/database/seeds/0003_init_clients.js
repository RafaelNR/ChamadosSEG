exports.seed = (knex) => {
	return knex("clientes")
		.del()
		.then(() => {
			return knex("clientes").insert([
				{
					razao_social: "Silva e Guedes",
					nome_fantasia: "Seg Tecnologia",
					cnpj_cpf: "00.000.000/0001-00",
					email: "seg@seg.eti.br",
					telefone: "(00) 0000-0000",
					actived: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					razao_social: "Rafael Rodrigues",
					nome_fantasia: "Rafel Company TEste",
					cnpj_cpf: "00.000.000/0001-60",
					email: "rafael@teste.com",
					telefone: "(12) 0000-0000",
					actived: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
