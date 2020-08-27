## TODO DB

- [ ] Criar tabela de anexos, e vincular ela a atividades e chamados.
- [x] na tabela log, Error deve ser null;
- [x] Tabela de chamados nome deve ser unico.
- [x] Mudar na tabela sub_categorias a coluna, categorias_id para categoria_id

## TODO SISTEMA

# v0.0.2

- [ ] Fazendo parte da subcategoria
- [ ] Nome da sub-categoria deve ser unico por categoria.

# v0.0.1

- [x] Razão social tb deve ser unico no clients;
- [x] Na tabela users, deve mudar login por user;
- [x] Tarefa deve ser do tipo texto;
- [x] Criar index no created_at na tabela de tarefas;
- [x] Tabela tarefa deve ser atividades;
- [x] id tabela atividades deve ser auto-increment;

* [x] Login deve ser uniqui;
* [x] Date last_acess deve ser data atual, e sem valor default;
* [x] Corrigir users_id de clients;
* [x] Colocar CNPJ/CPF e razão social e nome fantasia.
* [x] Auto-incremento de clients.

## RULES OF NWORKING

- Usuários podem ter mais de um cliente;

## API ENDPOINTS

- Usuarios
  - Todos -> GET -> /usuarios/
  - Único -> GET -> /usuarios/{id}
  - Insert -> POST -> /usuarios/
  - Delete -> PUT -> /usuarios/{id}
  - Update -> DELETE -> /usuarios/{id}
