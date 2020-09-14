exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("info_atividades")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("info_atividades").insert([
				{
					id: 1,
					descricao: "Fiz tal coisa",
					categoria_id: 1,
					atividade_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 2,
					descricao: "Fiz tal coisa 2",
					categoria_id: 1,
					atividade_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
