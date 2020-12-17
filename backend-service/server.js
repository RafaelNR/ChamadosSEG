const App = require('./src/app')
const knex = require("./src/database");


App.listen(3001, (err) => {
	if (err) console.log("> [Server] - Down -> , erro: " + err);
	console.log("> [Server] - Running...");
});

// Quando finalizar o express, finaliza todas os processos e fecha o banco de dados.
process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.log("Closing http server.");
	App.close(() => {
		console.log("Http server closed.");
    console.log("Knex connection destroy");
    knex.destroy();
		process.exit(0);
	});
});