
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chamados').del()
    .then(function () {
      // Inserts seed entries
      return knex("categorias_has_subcategorias").insert([
				{
					tecnico_requerente: 1,
					tecnico_atribuido: 2,
					cliente_atribuido: 1,
					prioridade: 1,
					titulo: "Teste 01",
					descricao: "Teste 01 Descrição",
				},
				{
					tecnico_requerente: 2,
					tecnico_atribuido: 1,
					cliente_atribuido: 1,
					prioridade: 2,
					titulo: "Teste 02",
					descricao: "Teste 02 Descrição",
				},
				{
					tecnico_requerente: 2,
					tecnico_atribuido: 1,
					cliente_atribuido: 1,
					prioridade: 2,
					titulo: "Teste 03",
					descricao: "Teste 03 Descrição",
				},
			]);
    });
};
