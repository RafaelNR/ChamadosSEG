exports.up = function (knex) {
	return knex.schema.createTable("tasks", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("status").notNullable();
		table
			.integer("owner_user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users");
		table
			.integer("open_by_user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users");
		table
			.integer("cliente_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("clientes");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("tasks");
};
