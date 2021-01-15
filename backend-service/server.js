require("dotenv/config");
const App = require('./src/app')
const knex = require("./src/database");

App.listen(process.env.BACK_PORT, (err) => {
	if (err) console.log("> [Server] - Down -> , erro: " + err);
	console.log("> [Server] - Running...");
});

// Quando finalizar o express, finaliza todas os processos e fecha o banco de dados.
process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.log("Closing http server.");
	App.close(() => {
		console.log("server closed.");
    console.log("Knex connection destroy");
    knex.destroy();
		process.exit(0);
	});
});

process.on("SIGINT", function () {
	console.info("SIGINT signal received.");
	console.log("Closing http server.");
	App.close(() => {
		console.log("server closed.");
		console.log("Knex connection destroy");
		knex.destroy();
		process.exit(0);
	});
});