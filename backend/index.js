"use strict";

require("dotenv/config");
const App = require("./src/core/app");
const knex = require('./src/database');

App.listen(process.env.BACK_PORT, (err) => {
	if (err) return console.log("> [BACKEND] - Down -> , erro: " + err);
	console.log("> [BACKEND] - Running...");
	console.log("> [BACKEND] - NODE: ", process.env.NODE_ENV);
	console.log("> [BACKEND] - Nome Service: ", process.env.APP_NAME);
	console.log("> [BACKEND] - Connecion IP: ", process.env.IP);
	console.log("> [BACKEND] - DB HOST: ", process.env.DB_HOST);
	console.log("> [BACKEND] - DB NAME: ", process.env.DB_NAME);
	console.log("> [BACKEND] - DB USER: ", process.env.DB_USER);
	console.log("> [BACKEND] - DB PASSWD: ", process.env.DB_PASSWD);
});

// Quando finalizar o express, finaliza todas os processos e fecha o banco de dados.
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
	console.log('Closing http server.');
	console.log("Knex connection destroy");
	console.log("server closed.");
	knex.destroy();
	process.exit(0);
});

process.on("SIGINT", function () {
	console.info("SIGINT signal received.");
	console.log("Closing http server.");
	console.log("Knex connection destroy");
	console.log("server closed.");
	knex.destroy();
	process.exit(0);
});