const knex = require("../database/index");
const SubCategoriasModel = require('./sub_category');

const index = async () => {
	return await knex
		.select(
			"categorias.id as id",
			"categorias.nome as nome",
			"users.nome as user",
			"categorias.created_at as created_at",
			"categorias.updated_at as updated_at"
		)
		.from("categorias")
		.leftJoin("users", "users.id", "=", "categorias.user_id")
		.limit(100)
		.then((Categorias) => {
			const Full = Categorias.map( async(categoria) => {

				return {
					...categoria,
					subCategorias: await SubCategoriasModel.findCategoria(categoria.id)
				};

			});

			return Promise.all(Full).then((Dados) => Dados)
			
		});
};

const findOne = async (ID) => {
	return await knex
		.select("id", "nome", "created_at", "updated_at")
		.from("categorias")
		.where("id", "=", ID)
		.limit(1)
		.then(async (Categoria) => {
			const subCategorias = await knex
				.select("id", "nome")
				.from("sub_categorias")
				.where("categoria_id", "=", Categoria[0].id);

			return {
				...Categoria[0],
				subCategorias,
			};
		});
};

const insert = async (Dados) => {
	return await knex
		.insert(Dados)
		.into("categorias")
		.then((id) => id[0]);
};

const update = async (Dados) => {
	return await knex("categorias").update(Dados).where("id", "=", Dados.id);
};

const deletar = async (ID) => {
	return await knex("categorias").del().where("id", "=", ID);
};

const countCategoria = async (ID) => {
	return await knex
		.count("id as id")
		.from("categorias")
		.where("id", "=", ID)
		.then((e) => e[0].id);
};

module.exports = {
	index,
	findOne,
	insert,
	update,
	deletar,
	countCategoria,
};
