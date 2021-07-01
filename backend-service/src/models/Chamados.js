const knex = require("../database");

const commonQuery = () => {
	return knex
		.select(
			"chamados.id",
			"user.nome as requerente",
			"user.imagem as requerente_imagem",
			"user.email as requerente_email",
			"chamados.requerente as requerente_id",
			"tecnico.nome as atribuido",
			"tecnico.imagem as atribuido_imagem",
			"tecnico.email as atribuido_email",
			"chamados.atribuido as atribuido_id",
			"cliente.nome_fantasia as cliente",
			"chamados.cliente_id as cliente_id",
			"categorias.id as categoria_id",
			"categorias.nome as categoria",
			"sub_categorias.id as sub_categoria_id",
			"sub_categorias.nome as sub_categoria",
			"chamados.titulo",
			"chamados.descricao",
			"chamados.status",
			"chamados.prioridade",
			"chamados.created_at",
			"chamados.updated_at"
		)
		.from("chamados")
		.innerJoin("users as user", "user.id", "=", "chamados.requerente")
		.innerJoin("users as tecnico", "tecnico.id", "=", "chamados.atribuido")
		.innerJoin("clientes as cliente", "cliente.id", "=", "chamados.cliente_id")
		.innerJoin("categorias", "categorias.id", "=", "chamados.categoria_id")
		.innerJoin(
			"sub_categorias",
			"sub_categorias.id",
			"=",
			"chamados.sub_categoria_id"
		);
};

const findOne = (id) => {
	return commonQuery()
		.where("chamados.id", "=", id)
		.limit(1)
		.then((e) => e[0]);
};


module.exports = {
  findOne
}