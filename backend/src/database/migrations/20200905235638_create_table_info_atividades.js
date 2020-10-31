exports.up = function (knex) {
	return knex.schema.createTable("infos_atividades", (table) => {
		table.increments("id").unsigned().notNullable();
		table.text("descricao", "mediumtext").notNullable();
		table
			.integer("categoria_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("categorias");
		table
			.integer("atividade_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("atividades");
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
	return knex.schema.dropTable("infos_atividades");
};
