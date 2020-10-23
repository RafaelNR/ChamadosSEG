const knex = require("../database/index");
const CategoriasHasSubCategorias = require('./categorias_has_subcategorias')

const index = async () => {
	return await knex
		.select(
			"sub.id as id",
			"sub.nome as nome",
			"users.nome as user",
			"sub.created_at as created_at",
			"sub.updated_at as updated_at"
		)
		.from("sub_categorias as sub")
		.leftJoin("users", "users.id", "=", "sub.user_id")
		.limit(100)
		.then((subCategorias) => {
			const Full = subCategorias.map( async(sub) => {

				return {
					...sub,
					categorias: await CategoriasHasSubCategorias.findCategoriaBySubCategoriaID(sub.id)
				};

			});

			return Promise.all(Full).then((Dados) => Dados);
			
		});
};

const findOne = async (ID) => {
	return await knex
		.select(
			"sub.id as id",
			"sub.nome as nome",
			"users.nome as user",
			"sub.created_at as created_at",
			"sub.updated_at as updated_at"
		)
		.from("sub_categorias as sub")
		.leftJoin("users", "users.id", "=", "sub.user_id")
		.where("sub.id", "=", ID)
		.then(async (subCategorias) => {

				return {
					...subCategorias[0],
					categorias: await CategoriasHasSubCategorias.findCategoriaBySubCategoriaID(subCategorias[0].id)
				};
			
		});
};

const insert = async (Dados) => {
	return await knex
		.insert(Dados)
		.into("sub_categorias")
		.then((id) => id[0]);
};

const update = async (Dados) => {
	return await knex("sub_categorias").update(Dados).where("id", "=", Dados.id);
};

const deletar = async (ID) => {
	return await knex("sub_categorias").del().where("id", "=", ID);
};


const countByID = async (ID) => {
	return await knex.count('id as id').from('sub_categorias').where('id','=',ID).then(id => id[0])
}




module.exports = {
	index,
	findOne,
	insert,
	update,
	deletar,
	countByID
};
