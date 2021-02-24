
exports.up = function(knex) {
    return knex.schema.createTable("generated_pdf", (table) => {
			table.increments("id").unsigned().notNullable();
			table.string("status").notNullable();
      table.string("path").notNullable();
			table.string("filename").notNullable();
      table.text("error", "mediumtext");
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
  return knex.schema.dropTable("generated_pdf");
};
