exports.up = function (knex) {
	return knex.schema.createTable("roles", (table) => {
		table.increments("id").notNullable();
		table.string("nome").unique().notNullable();
		table.string("permissions").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("roles");
};
