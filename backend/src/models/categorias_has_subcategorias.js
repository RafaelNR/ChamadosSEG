const knex = require("../database/index");

const findSubCategoriasByCategoriaID = async (categoria_id) => {

  return await knex
            .select('subcategoria_id as id','sub_categorias.nome as nome')
            .from('categorias_has_subcategorias')
            .innerJoin('sub_categorias','sub_categorias.id','=','categorias_has_subcategorias.subcategoria_id')
            .where('categoria_id','=',categoria_id);

}

const findCategoriaBySubCategoriaID = async (subCategoria_id) => {

  return await knex
            .select('categoria_id as id','categorias.nome as nome')
            .from('categorias_has_subcategorias')
            .innerJoin('categorias','categorias.id','=','categorias_has_subcategorias.categoria_id')
            .where('subcategoria_id','=',subCategoria_id);

}


const insert = async (Dados) => await knex.insert(Dados).into("categorias_has_subcategorias");


const deleteByCategoria_id = async (categoria_id) => await knex("categorias_has_subcategorias").del().where("categoria_id", "=", categoria_id);


module.exports = {
  findSubCategoriasByCategoriaID,
  findCategoriaBySubCategoriaID,
  insert,
  deleteByCategoria_id
}