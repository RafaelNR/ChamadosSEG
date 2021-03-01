## TODO

- [ ] Banco de dados de Chamados devem ter, nome chamados:
- id
- ticket
- categoria_id
- sub_categoria_id
- tecnico_requerente
- tecnico_atribuido
- cliente_atribuido
- status -> (Novo, Atribuído, Pendente, Realizado, Fechado)
* Novo -> Assim que é aberto e sem técnico atribuído;
* Atribuído -> Técnico já notificado;
* Pendente -> Técnico já atribuído, notificado, porém sem andamento;
* Realizado -> Técnico atribuído já fez;
* Fechando -> Técnico requerente fechou o chamado;
* Cancelado -> Técnico Requerente cancelou o chamado;
- prioridade -> (Baixo, Média, Alta, Crítica)
- titulo
- descrição inicial
- user_id
- created_at
- update_at

- [ ] Banco de dados de acompanhamentos, nome acm_chamados:
- id
- chamado_id
- tipo - (nota, tarefa, solução, fechamento)
- Descrição
- user_id
- Created_at
- Update_at

- [ ] Arquivos, arq_chamados:
- id
- filename
- path
- chamado_id
- user_id
- created_at
- updated_at

- [ ] Regra de négocio:
- Ticket deve ser único por chamado;
- Adm pode ver todos os chamados;
- Técnicos só podem atribuir chamado para técnicos dos seus cliente ou analista e adm gerais;
- Adm pode atribuir chamados para todos os técnicos ou clientes;

