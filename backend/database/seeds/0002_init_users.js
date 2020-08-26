exports.seed = (knex) => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 0, 
        nome: 'Rafael Rodrigues', 
        login: 'rafaelnetto',
        passwd: 'rafaelnetto',
        email: 'rafael.r@seg.eti.br',
        actived: 1,
        role_id: 1,
        created_at: knex.fn.now(), 
        updated_at: knex.fn.now()
        },]);
    });
};
