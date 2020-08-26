const Router = require("express").Router();

const { login } = require("../controllers/login");
const User = require("./user");
const Client = require("./client");
const Atividades = require("./atividades");
const Categorias = require("./category");

Router.get("/", (req, res) => res.redirect("/login"));

Router.post("/login", login);
Router.use("/usuarios", User());
Router.use("/clientes", Client());
Router.use("/atividades", Atividades());
Router.use("/categorias", Categorias());

Router.get("/logout", (req, res) => {
	return res.json({
		Page: "logout",
		auth: false,
		token: null,
	});
});

Router.get("/home", (req, res) => {
	return res.json({
		Page: "home",
	});
});

// Página não existe
Router.use((req, res, next) => {
	const error = new Error(`Página não existe  ${req.originalUrl} `);
	res.status(400);
	next(error);
});

module.exports = Router;
