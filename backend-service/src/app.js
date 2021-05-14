const Express = require("express");
const Cors = require("cors");
const Helmet = require("helmet");
const BodyParser = require("body-parser");
const Routes = require("./routes/index");
const Access = require("./middlewares/access");
const FilesStatics = require("./middlewares/files");


const App = Express();

// Desabilitado politica de contéudo;
App.use(
  Helmet({
    contentSecurityPolicy: false,
  })
);

//CORS
const whiteList = [
	"http://localhost:3000",
	"http://localhost",
	process.env.URL_BACKEND,
	process.env.URL_FRONTEND,
];

App.use(
	Cors({
		origin: whiteList,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

// BodyParser
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());
FilesStatics(App, Express);
App.use(Access.Purchase);


App.use(Routes);

// Ignore favicon
App.use("/favicon.ico", (req, res, next) => {
	Express.static(path.join(__dirname, "..","static","favicon.ico"));
	next();
});

// Erro genérico
App.use((error, req, res, next) => {
	res.status(404).json({
		code: 404,
		success: false,
		message: error && error.message ? error.message : error,
		error: process.env.NODE_ENV === "dev" ? error.stack : "",
	});
	next();
});

module.exports = App;
