exports.up = function(knex) {
  return knex.schema.createTable("send_emails", (table) => {
    table.increments("id").unsigned().notNullable();
    table.string("status").notNullable();
    table.string("type").notNullable();
    table.string("to").notNullable();
    table.string("subject").notNullable();
    table.string("file");
    table.string("filename");
    table.text("error", "mediumtext");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("send_emails");
};
