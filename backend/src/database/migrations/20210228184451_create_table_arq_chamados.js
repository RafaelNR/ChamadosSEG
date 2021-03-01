
exports.up = function(knex) {
  return knex.schema.createTable("arq_chamados", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("filename").notNullable();
		table.string("path").notNullable();
    table
      .integer("chamado_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("chamados");
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
  return knex.schema.dropTable("arq_chamados");
};
