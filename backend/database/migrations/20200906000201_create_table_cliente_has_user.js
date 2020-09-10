exports.up = function (knex) {
	return knex.schema.createTable("cliente_has_user", (table) => {
		table
			.integer("cliente_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("clientes");
		table
			.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("cliente_has_user");
};
