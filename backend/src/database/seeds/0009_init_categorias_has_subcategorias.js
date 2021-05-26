
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categorias_has_subcategorias').del()
    .then(function () {
      // Inserts seed entries
      return knex('categorias_has_subcategorias').insert([
				{ categoria_id: 1, subcategoria_id: 1 },
				{ categoria_id: 2, subcategoria_id: 2 },
				{ categoria_id: 2, subcategoria_id: 3 },
      ]);
    });
};
