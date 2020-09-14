exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("acm_tasks")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("acm_tasks").insert([
				{
					id: 1,
					task_id: 1,
					user_id: 1,
					type: "Aberto",
					descricao: "Fazer tal coisa",
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
