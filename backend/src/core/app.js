"use strict";
const express = require("express");
const App = express();

const Rotas = require("../routes/index");
const Middlewares = require("../middlewares/index");
const FilesStatics = require("../middlewares/files");

Middlewares(App);
FilesStatics(App, express);
App.use(Rotas);


// Ignore favicon
App.use((req, res, next) => {
	if (res.url !== "/favicon.ico") {
		next();
	}
});

App.use((error, req, res, next) => {
	res.status(404).json({
		message: error.message,
		success: false,
		error: process.env.NODE_ENV === "dev" ? error.stack : "",
	});
	next();
});

module.exports = App;
