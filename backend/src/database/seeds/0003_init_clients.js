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
					razao_social: "Consórcio Intermunicipal da Rede de Urgência Centro Sul",
					nome_fantasia: "CISRU/SAMU",
					cnpj_cpf: "11.938.399/0000.1-72",
					email: "cpd@cisru.saude.mg.gov.br",
					telefone: "(32) 3339-5599",
					representante: "Rodrigo Osanam",
					n_contrato: '001-2012',
					actived: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
