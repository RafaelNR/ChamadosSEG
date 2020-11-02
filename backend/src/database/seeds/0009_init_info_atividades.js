exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("infos_atividades")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("infos_atividades").insert([
				{
					id: 1,
					descricao: "Fiz tal coisa",
					info_ticket: "95685_20200930",
					categoria_id: 1,
					atividade_id: 1,
					user_id: 1,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 2,
					descricao: "Fiz tal coisa 2",
					info_ticket: "95685_20200930",
					categoria_id: 1,
					atividade_id: 1,
					user_id: 2,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
