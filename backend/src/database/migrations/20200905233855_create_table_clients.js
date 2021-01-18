exports.up = function (knex) {
	return knex.schema.createTable("clientes", (table) => {
		table.increments("id").unsigned().notNullable();
		table.string("razao_social").unique().notNullable();
		table.string("nome_fantasia").unique().notNullable();
		table.string("cnpj_cpf").unique().notNullable();
		table.string("email").notNullable();
		table.string("n_contrato").notNullable();
		table.string("telefone").unique().notNullable();
		table.string("representante").notNullable();
		table.integer("actived").unsigned().defaultTo(1);
		table.string("imagem");
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
	return knex.schema.dropTable("clientes");
};
