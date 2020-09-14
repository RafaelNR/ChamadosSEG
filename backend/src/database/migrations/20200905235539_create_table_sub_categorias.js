exports.up = function (knex) {
	return knex.schema.createTable("sub_categorias", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("nome").unique().notNullable();
		table
			.integer("categoria_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("categorias");
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
	return knex.schema.dropTable("sub_categorias");
};
