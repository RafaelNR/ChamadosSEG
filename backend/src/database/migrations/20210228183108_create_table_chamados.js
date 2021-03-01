
exports.up = function(knex) {
  return knex.schema.createTable("chamados", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("ticket").unique().notNullable();
    table
      .integer("tecnico_requerente")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table
			.integer("tecnico_atribuido")
			.unsigned()
			.references("id")
			.inTable("users");
    table
			.integer("cliente_atribuido")
			.unsigned()
			.references("id")
			.inTable("clientes");
    table.string('status').notNullable();
    table.string('prioridade').notNullable();
    table.string('titulo').notNullable();
    table.text("descricao", "mediumtext").notNullable();
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

exports.down = function(knex) {
  return knex.schema.dropTable("chamados");
};
