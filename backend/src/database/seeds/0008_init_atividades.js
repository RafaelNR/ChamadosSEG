exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("atividades")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("atividades").insert([
				{
					id: 1,
					ticket: "1.20200930",
					user_id: 1,
					cliente_id: 1,
					date: "2020-09-30",
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 2,
					ticket: "2.20200930",
					user_id: 2,
					cliente_id: 1,
					date: "2020-10-15",
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};

