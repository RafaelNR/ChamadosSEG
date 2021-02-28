require("dotenv/config");
const App = require('./src/app')
const knex = require("./src/database");
const ManagerCron = require('./src/manager-cron');

App.listen(process.env.BACK_PORT, (err) => {
	if (err) console.log("> [Server] - Down -> , erro: " + err);
	console.log("> [BACKEND SERVICE] - Running...");
	console.log("> [BACKEND SERVICE SERVICE] - NODE: ", process.env.NODE_ENV);
	console.log("> [BACKEND SERVICE] - Nome Service: ", process.env.APP_NAME);
	console.log("> [BACKEND SERVICE] - Connecion IP: ", process.env.IP);
	console.log("> [BACKEND SERVICE] - DB HOST: ", process.env.DB_HOST);
	console.log("> [BACKEND SERVICE] - DB NAME: ", process.env.DB_NAME);
	console.log("> [BACKEND SERVICE] - DB USER: ", process.env.DB_USER);
	console.log("> [BACKEND SERVICE] - DB PASSWD: ", process.env.DB_PASSWD);
	console.log("> [BACKEND SERVICE] - MANAGER-CRON INICIADO");
	ManagerCron.run();
});

// Quando finalizar o express, finaliza todas os processos e fecha o banco de dados.
process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.log("Closing http server.");
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