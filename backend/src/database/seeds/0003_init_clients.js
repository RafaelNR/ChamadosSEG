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
					representante: "Rafael",
					n_contrato: '56565655',
					actived: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					razao_social: "Empresa 01",
					nome_fantasia: "Empresa Teste 01",
					cnpj_cpf: "00.000.000/0001-60",
					email: "empresa01@teste.com",
					telefone: "(12) 0000-0001",
					representante: "Rafael",
					n_contrato: '56565755',
					actived: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					razao_social: "Empresa 02",
					nome_fantasia: "Empresa Teste 02",
					cnpj_cpf: "00.000.000/0002-60",
					email: "empresa01@teste.com",
					telefone: "(12) 0000-0002",
					representante: "Rafael",
					n_contrato: '56565965',
					actived: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					razao_social: "Empresa 03",
					nome_fantasia: "Empresa Teste 03",
					cnpj_cpf: "00.000.000/0003-60",
					email: "empresa01@teste.com",
					telefone: "(12) 0000-0003",
					representante: "Rafael",
					n_contrato: '56566955',
					actived: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
