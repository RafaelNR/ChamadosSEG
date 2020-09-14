exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("tasks")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("tasks").insert([
				{
					id: 1,
					cliente_id: 1,
					owner_user_id: 1,
					open_by_user_id: 1,
					status: "Aberto",
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				},
			]);
		});
};
