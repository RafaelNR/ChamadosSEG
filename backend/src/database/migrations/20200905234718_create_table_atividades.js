exports.up = function (knex) {
	return knex.schema.createTable("atividades", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("ticket").notNullable();
		table
			.integer("user_id")
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
		table
			.date("date")
			.notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("atividades");
};
