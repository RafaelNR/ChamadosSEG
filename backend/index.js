"use strict";

const config = require("dotenv").config().parsed;
const App = require("./src/core/app");
const knex = require('./src/database');

App.listen(config.BACK_PORT, (err) => {
	if (err) console.log("> [Server] - Down -> , erro: " + err);
	console.log("> [Server] - Running...");
	console.log("> [Server] - BackEnd Port: ", config.BACK_PORT);
	console.log("> [Server] - Connecion IP: ", config.IP);
	console.log("> [Server] - NODE: ", config.NODE_ENV);
});

// Quando finalizar o express, finaliza todas os processos e fecha o banco de dados.
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
	console.log('Closing http server.');
  App.close(() => {
    console.log('Http server closed.');
    knex.destroy();
    console.log('Knex connection destroy');
		process.exit(0);
  });
});