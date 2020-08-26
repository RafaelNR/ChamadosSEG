"use strict";

const Express = require("express");
const App = Express();
const Router = Express.Router();

const Rotas = require("../routes/index");
const Middlewares = require("../middlewares/index");

const config = require("dotenv").config().parsed;

Middlewares(App);
App.use(Rotas(Router));

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
