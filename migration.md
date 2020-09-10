# Migrations

## Lista de migrations

knex migrate:list

## Create Migration

knex migrate:make migration_name --env migration

## Executa a proxima migration não executada

knex migrate:up --env migration

## Executa um migration especifica ainda não executada

knex migrate:up 001_migration_name.js --env migration

## Rever a ultima migração

knex migrate:down --env migration

## Reverte a ultima migração especifica.

knex migrate:down 001_migration_name.js --env migration

## Reverter o último lote de alteração

knex migrate:rollback --env migration

## Revertar todas as alterações

knex migrate:rollback --all --env migration

# Seeds
