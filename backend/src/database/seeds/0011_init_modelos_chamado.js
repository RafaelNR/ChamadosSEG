exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("modelos_chamado")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("modelos_chamado").insert([
				{
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Cadastro de Dispositivos no firewall",
					descricao: "Teste 01 Descrição",
					user_id: 1,
				},
				{
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Alteração de dados de dispositivo no firewall",
					descricao: "Teste 02 Descrição",
					user_id: 1,
				},
				{
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Dispositivo navegando sem cadastro.",
					descricao: "Teste 03 Descrição",
					user_id: 2,
				},
				{
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Liberação de aplicativo no firewall",
					descricao: "Teste 01 Descrição",
					user_id: 2,
				},
			]);
		});
};
