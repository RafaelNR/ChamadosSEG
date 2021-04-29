const Router = require("express").Router();
const verifyToken = require("../middlewares/jwt");

// Controllers
const Log = require("../controllers/log");
const Auth = require("../controllers/auth");
const Login = require("../controllers/login");
const Perfil = require("../controllers/perfil");
const RecuperarSenha = require("../controllers/recuperar_senha");

Router.get("/", (req, res) =>
	res.status(200).json({
		message: "API backend Online!",
	})
);

// Rotas sem token;
Router.post("/recuperar-senha", RecuperarSenha.order);
Router.get("/recuperar-senha", RecuperarSenha.access);
Router.put("/recuperar-senha", RecuperarSenha.changePasswd);
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
Router.use("/atividades", verifyToken, require("./atividades"));
Router.use("/categorias", verifyToken, require("./category"));
//Router.get("/chamados", verifyToken, require('./chamados'));
Router.use("/clientes", verifyToken, require("./clientes"));
Router.use("/dashboard", verifyToken, require('./dashboard.js'));
Router.get("/log", verifyToken, Log.index);
Router.use("/pdf", verifyToken, require("./pdf"));
Router.use("/perfil", verifyToken, Perfil);
Router.use("/subcategorias", verifyToken, require("./subcategory"));
Router.use(["/tasks", "/tarefas"], verifyToken, require("./tasks"));
Router.use("/usuarios", verifyToken, require("./user"));
Router.use("/uploads", verifyToken, require("./uploads"));



// Página não existe
Router.use((req, res, next) => {
	const error = new Error(`Página não existe ${req.originalUrl}`);
	res.status(404);
	next(error);
});

module.exports = Router;
