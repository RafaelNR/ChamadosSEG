exports.up = function (knex) {
	return knex.schema.createTable("recover_passwd", (table) => {
    table.increments("id").unsigned().notNullable();
		table.string("user_email").notNullable();
		table.string("hash").notNullable().unique();
    table.string("access_code").notNullable().unique();
    table.string("ip_remote").notNullable();
		table.string("sent_at");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("recover_passwd");
};
