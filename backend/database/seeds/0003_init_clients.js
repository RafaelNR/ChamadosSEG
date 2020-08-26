exports.seed = (knex) => {
  return knex('clientes').del()
    .then(() => {
      return knex('clientes').insert([{
        id: 0, 
        razao_social: "Silva e Guedes",
        nome_fantasia: 'Seg Tecnologia', 
        cnpj_cpf: "00.000.000/0001-00",
        email: 'seg@seg.eti.br',
        user_id: 1,
        created_at: knex.fn.now(), 
        updated_at: knex.fn.now()
        },]);
    });
};
