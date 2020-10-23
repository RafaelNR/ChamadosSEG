exports.up = function (knex) {
	return knex.schema.createTable("categorias_has_subcategorias", (table) => {
		table
      .integer("categoria_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("categorias")
      .onDelete("cascade");
		table
			.integer("subcategoria_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("sub_categorias")
			.onDelete("cascade");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("categorias_has_subcategorias");
};
