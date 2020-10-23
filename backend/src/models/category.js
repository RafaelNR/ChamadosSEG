const knex = require("../database/index");
const CategoriasHasSubCategorias = require('./categorias_has_subcategorias')

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
					subCategorias: await CategoriasHasSubCategorias.findSubCategoriasByCategoriaID(categoria.id)
				};

			});

			return Promise.all(Full).then((Dados) => Dados)
			
		});
};

const findOne = async (ID) => {
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
		.where("categorias.id", "=", ID)
		.limit(1)
		.then(async (Categoria) => {
			const subCategorias = await CategoriasHasSubCategorias
																	.findSubCategoriasByCategoriaID(Categoria[0].id)

			return {
				...Categoria[0],
				subCategorias,
			};
		});
};

const insert = (Dados) => {
	return knex
		.insert(Dados.categoria)
		.into("categorias")
		.then(async ID => {
			
			try {
				Dados.subCategorias.map(async (subCategoria_id) => {
					await CategoriasHasSubCategorias.insert({
						categoria_id: ID[0],
						subcategoria_id: subCategoria_id
					})
				})
				return ID[0]
			} catch (error) {
				this.deleteByCategoria_id(ID[0]);
				throw 'Erro em inserir subcategorias.'
			}

		})
};

const update = (Dados) => {
	return knex("categorias")
		.update(Dados.categoria)
		.where("id", "=", Dados.categoria.id).then(async () => {

			try {
				await CategoriasHasSubCategorias.deleteByCategoria_id(Dados.categoria.id)
				.then(async () => {
					await Dados.subCategorias.map(async (subCategoria_id) => {
						await CategoriasHasSubCategorias.insert({
							categoria_id: Dados.categoria.id,
							subcategoria_id: subCategoria_id
						})
					});
				})
								
			} catch (error) {
				throw 'Erro editar subcategorias'
			}

		});
};

const deletar = async (ID) => {
	await knex("categorias").del().where("id", "=", ID);
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
