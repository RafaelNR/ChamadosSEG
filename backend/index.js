"use strict";

const config = require("dotenv").config().parsed;
const App = require("./src/core/app");

App.listen(config.BACK_PORT, (err) => {
	if (err) console.log("> [Server] - Down -> , erro: " + err);

	console.log("> [Server] - Running...");
	console.log("> [Server] - BackEnd Port: ", config.BACK_PORT);
	console.log("> [Server] - Connecion IP: ", config.IP);
	console.log("> [Server] - NODE: ", config.NODE_ENV);
});
