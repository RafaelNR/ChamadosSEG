exports.up = function (knex) {
  return Promise.all([
    knex.raw(
      "ALTER TABLE `chamados` DROP FOREIGN KEY `chamados_cliente_atribuido_foreign`"
    ),
    knex.raw(
      "ALTER TABLE `chamados` CHANGE COLUMN `cliente_atribuido` `cliente_atribuido` INT(10) UNSIGNED NOT NULL AFTER `tecnico_requerente`"
    ),
    knex.raw(
      "ALTER TABLE `chamados` ADD CONSTRAINT `chamados_cliente_atribuido_foreign` FOREIGN KEY (`cliente_atribuido`) REFERENCES `clientes` (`id`)"
    ),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.raw("ALTER TABLE `chamados` DROP FOREIGN KEY `chamados_cliente_atribuido_foreign`"),
    knex.raw("ALTER TABLE `chamados` DROP FOREIGN KEY `chamados_cliente_atribuido_foreign`"),
    knex.raw("ALTER TABLE `chamados` CHANGE COLUMN `cliente_atribuido` `cliente_atribuido` INT(10) UNSIGNED NULL"),
    knex.raw("ALTER TABLE `ostecnicos`.`chamados` ADD CONSTRAINT `chamados_cliente_atribuido_foreign` FOREIGN KEY (`cliente_atribuido`) REFERENCES `ostecnicos`.`clientes` (`id`)"),
  ]);
};



