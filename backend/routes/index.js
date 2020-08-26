const Router = require("express").Router();
const { verifyJWT } = require("../middlewares/jwt");

// Controlleres
const { login } = require("../controllers/login");

Router.get("/", (req, res) =>
	res.status(200).json({
		message: "API backend Online!",
	})
);

Router.post("/login", login);

// Essas rotas requerem token;
Router.use("/usuarios", verifyJWT, require("./user"));
Router.use("/clientes", verifyJWT, require("./client"));
Router.use("/atividades", verifyJWT, require("./atividades"));
Router.use("/categorias", verifyJWT, require("./category"));
Router.use("/tarefas", verifyJWT, require("./tasks"));

Router.get("/logout", verifyJWT, (req, res) => {
	return res.status(200).json({
		Page: "logout",
		auth: false,
		token: null,
	});
});

Router.get("/home", verifyJWT, (req, res) => {
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
