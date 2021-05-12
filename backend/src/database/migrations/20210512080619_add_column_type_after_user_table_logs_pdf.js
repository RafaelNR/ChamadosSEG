
exports.up = function(knex) {
  return knex.schema.alterTable("logs_pdf", (table) => {
    table.string("type", 255).notNullable(); // add
	});
};

exports.down = function(knex) {
  return knex.schema.alterTable("logs_pdf", (table) => {
    table.dropColumn("type");
  });
};
