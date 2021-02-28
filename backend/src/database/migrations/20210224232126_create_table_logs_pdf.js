exports.up = function (knex) {
	return knex.schema.createTable("logs_pdf", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("status").notNullable();
		table.string("dados").notNullable();
		table.string("path");
		table.text("error", "mediumtext");
		table.integer("user_id").unsigned().references("id").inTable("users");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("logs_pdf");
};
