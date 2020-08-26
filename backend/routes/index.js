const { verifyJWT } = require("../middlewares/jwt");

// Controlleres
const { login } = require("../controllers/login");
const User = require("./user");
const Client = require("./client");
const Atividades = require("./atividades");
const Categorias = require("./category");

module.exports = (Router) => {
	Router.get("/", (req, res) =>
		res.status(200).json({
			message: "API backend Online!",
		})
	);

	Router.post("/login", login);

	// Essas rotas requerem token;
	Router.use("/usuarios", verifyJWT, User());
	Router.use("/clientes", verifyJWT, Client());
	Router.use("/atividades", verifyJWT, Atividades());
	Router.use("/categorias", verifyJWT, Categorias());

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

	return Router;
};
