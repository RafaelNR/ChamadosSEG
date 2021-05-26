exports.up = function (knex) {
	return knex.schema.createTable("chamados", (table) => {
		table.increments("id").unsigned().notNullable();
		table
			.integer("requerente")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users");
		table
			.integer("atribuido")
			.unsigned()
			.references("id")
			.inTable("users");
		table
			.integer("cliente_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("clientes");
		table.string("status").defaultTo('Aberto');
    table.integer("prioridade").defaultTo(0);
		table.string("titulo").notNullable();
		table.text("descricao", "mediumtext").notNullable();
		table
			.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
      .inTable("users");
    table
      .integer("categoria_id")
      .unsigned()
      .references("id")
      .inTable("categorias");
    table
      .integer("sub_categoria_id")
      .unsigned()
      .references("id")
      .inTable("sub_categorias");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("chamados");
};
