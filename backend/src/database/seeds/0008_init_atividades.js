exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("atividades")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("atividades").insert([
				{
					id: 1,
          user_id: 1,
					cliente_id: 1,
					date: '2020-09-30',
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
				{
					id: 2,
          user_id: 1,
					cliente_id: 1,
					date: '2020-10-15',
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};

