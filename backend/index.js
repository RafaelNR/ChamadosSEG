"use strict";

require("dotenv/config");
const App = require("./src/core/app");
const knex = require('./src/database');

App.listen(process.env.BACK_PORT, (err) => {
	if (err) return console.log("> [BACKEND] - Down -> , erro: " + err);
	console.log("> [BACKEND] - Running...");
	console.log("> [BACKEND] - Nome Service: ", process.env.APP_NAME);
	console.log("> [BACKEND] - Connecion IP: ", process.env.IP);
	console.log("> [BACKEND] - BackEnd Port: ", process.env.BACK_PORT);
	console.log("> [BACKEND] - NODE: ", process.env.NODE_ENV);
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