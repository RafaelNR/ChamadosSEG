const Router = require("express").Router();
const verifyToken = require("../middlewares/jwt");

// Controllers
const Auth = require("../controllers/auth");
const Login = require("../controllers/login");
const Perfil = require("../controllers/perfil");


Router.get("/", (req, res) =>
	res.status(200).json({
		message: "API backend Online!",
	})
);

// Rotas sem token;
Router.post("/login", Login);
Router.get("/auth", Auth);
Router.use("/recuperar-senha", require("./recuperar_senha"));


// Essas rotas requerem token;
Router.use("/atividades", verifyToken, require("./atividades"));
Router.use("/categorias", verifyToken, require("./category"));
//Router.get("/chamados", verifyToken, require('./chamados'));
Router.use("/clientes", verifyToken, require("./clientes"));
Router.use("/dashboard", verifyToken, require('./dashboard.js'));
Router.use("/logs", verifyToken, require("./logs.js"));
Router.use("/pdf", verifyToken, require("./pdf"));
Router.use("/perfil", verifyToken, Perfil);
Router.use("/subcategorias", verifyToken, require("./subcategory"));
Router.use(["/tasks", "/tarefas"], verifyToken, require("./tasks"));
Router.use("/usuarios", verifyToken, require("./user"));
Router.use("/uploads", verifyToken, require("./uploads"));

Router.get("/logout",verifyToken, (req, res) => {
	return res.status(200).json({
		action: "logout",
		auth: false,
		token: null,
	});
});


// Página não existe
Router.use((req, res, next) => {
	const error = new Error(`Página não existe ${req.originalUrl}`);
	res.status(404);
	next(error);
});

module.exports = Router;
