exports.up = function (knex) {
	return knex.schema.createTable("modelos_chamado", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("titulo").notNullable();
		table.text("descricao", "mediumtext").notNullable();
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
	return knex.schema.dropTable("modelos_chamado");
};
