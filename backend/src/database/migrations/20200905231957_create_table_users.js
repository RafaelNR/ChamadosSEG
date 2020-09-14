exports.up = function (knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("nome").unique().notNullable();
		table.string("user").unique().notNullable();
		table.string("passwd").notNullable();
		table.string("email").notNullable();
		table.string("telefone").unique().notNullable();
		table.integer("actived").unsigned().defaultTo(1);
		table.timestamp("last_acess").defaultTo(knex.fn.now());
		table.string("imagem");
		table
			.integer("role_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("roles");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("users");
};
