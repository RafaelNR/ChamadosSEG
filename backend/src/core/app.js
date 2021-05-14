"use strict";
const Express = require("express");
const App = Express();

const Rotas = require("../routes/index");
const Middlewares = require("../middlewares/index");
const FilesStatics = require("../middlewares/files");

Middlewares(App);
FilesStatics(App, Express);
App.use(Rotas);


// Ignore favicon
App.use("/favicon.ico", (req, res, next) => {
	Express.static(path.join(__dirname, "..", "..", "public", "favicon.ico"));
	next();
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
