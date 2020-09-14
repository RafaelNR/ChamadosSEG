exports.up = function (knex) {
	return knex.schema.createTable("logs", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("type").notNullable();
		table.string("category").notNullable();
		table.text("error", "text");
		table
			.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("logs");
};
