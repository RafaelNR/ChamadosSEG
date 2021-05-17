exports.up = function (knex) {
  return Promise.all([
    knex.raw("ALTER TABLE `chamados` CHANGE COLUMN `status` `status` INT(10) NOT NULL , CHANGE COLUMN `prioridade` `prioridade` INT(10) NOT NULL"),
    knex.raw('ALTER TABLE `chamados` DROP COLUMN `ticket`, DROP INDEX `chamados_ticket_unique`')
  ])


};

exports.down = function (knex) {
  return Promise.all([
    knex.raw(
		"ALTER TABLE `chamados` CHANGE COLUMN `status` `status` VARCHAR(255) NOT NULL , CHANGE COLUMN `prioridade` `prioridade` VARCHAR(255) NOT NULL"
    ),
    knex.raw("ALTER TABLE `chamados` ADD COLUMN `ticket` INT(10) NOT NULL AFTER `id`")
  ]);
};




