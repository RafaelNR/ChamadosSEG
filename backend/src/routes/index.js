const Router = require("express").Router();
const verifyToken = require("../middlewares/jwt");

// Controllers
const Login = require("../controllers/login");
const Auth = require("../controllers/auth");
const Perfil = require("../controllers/perfil");
const Log = require("../controllers/log");

Router.get("/", (req, res) =>
	res.status(200).json({
		message: "API backend Online!",
	})
);

Router.post("/login", Login);
Router.get("/auth", Auth);

Router.get("/logout", (req, res) => {
	return res.status(200).json({
		Page: "logout",
		auth: false,
		token: null,
	});
});




// Essas rotas requerem token;
Router.use("/usuarios", verifyToken, require("./user"));
Router.use("/clientes", verifyToken, require("./clientes"));
Router.use("/atividades", verifyToken, require("./atividades"));
Router.use("/categorias", verifyToken, require("./category"));
Router.use("/subcategorias", verifyToken, require("./subcategory"));
Router.use(["/tasks", "/tarefas"], verifyToken, require("./tasks"));
Router.use("/perfil", verifyToken, Perfil);
Router.use("/pdf", verifyToken, require("./pdf"));
Router.use("/dashboard", verifyToken, require('./dashboard.js'));
Router.get("/log", verifyToken, Log.index);



// Página não existe
Router.use((req, res, next) => {
	const error = new Error(`Página não existe ${req.originalUrl}`);
	res.status(404);
	next(error);
});

module.exports = Router;
