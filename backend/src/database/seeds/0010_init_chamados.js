
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chamados').del()
    .then(function () {
      // Inserts seed entries
      return knex("chamados").insert([
				{
					requerente: 1,
					atribuido: 1,
					cliente_id: 1,
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Teste 01",
					descricao: "Teste 01 Descrição",
					user_id: 1,
				},
				{
					requerente: 1,
					atribuido: 2,
					cliente_id: 2,
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Teste 02",
					descricao: "Teste 02 Descrição",
					user_id: 1,
				},
				{
					requerente: 2,
					atribuido: 1,
					cliente_id: 2,
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Teste 03",
					descricao: "Teste 03 Descrição",
					user_id: 2,
				},
				{
					requerente: 2,
					atribuido: 2,
					cliente_id: 2,
					categoria_id: 1,
					sub_categoria_id: 1,
					titulo: "Teste 01",
					descricao: "Teste 01 Descrição",
					user_id: 2,
				},
			]);
    });
};
