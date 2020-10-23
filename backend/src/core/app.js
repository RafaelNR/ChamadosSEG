"use strict";

const App = require("express")();

const Rotas = require("../routes/index");
const Middlewares = require("../middlewares/index");

const config = require("dotenv").config().parsed;

Middlewares(App);
App.use(Rotas);

// Ignore favicon
App.use((req, res, next) => {
	if (res.url !== "/favicon.ico") {
		next();
	}
});


/**
 * Tratamento de erro genérico;
 */
App.use((error, req, res, next) => {
	res.status(404).json({
		message: error.message,
		error: config.NODE_ENV === "dev" ? error.stack : "",
	});
	next();
});

module.exports = App;
