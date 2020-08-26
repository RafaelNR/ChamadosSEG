exports.seed = (knex) => {
  return knex('roles').del()
    .then(() => {
      return knex('roles').insert([
        {id: 1, nome: 'admin', permissions:'all', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 2, nome: 'analista', permissions:'restric', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 3, nome: 'tecnico', permissions:'restric', created_at: knex.fn.now(), updated_at: knex.fn.now()},
      ]);
    })
};
