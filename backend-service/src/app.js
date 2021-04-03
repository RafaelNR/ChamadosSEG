const Express = require("express");
const Cors = require("cors");
const Helmet = require("helmet");
const BodyParser = require("body-parser");
const Routes = require("./routes/index");
const Access = require("./middlewares/access");

const App = Express();
App.use(Helmet());
App.use('/tmp', Express.static("tmp"));
App.use('/static', Express.static("static"));

App.use(function (req, res, next) {
  res.setHeader(
		"Content-Security-Policy-Report-Only",
		"default-src 'self'; font-src 'self'; img-src 'self' http://seg.eti.br; script-src 'self'; style-src 'self'; frame-src 'self'"
	);
	next();
});

//CORS
App.use(Cors());
// const whiteList = [
// 	"http://localhost:3000",
// 	"http://localhost",
// 	process.env.URL_BACKEND,
// 	process.env.URL_FRONTEND,
// ];

// App.use(
// 	Cors({
// 		origin: whiteList,
// 		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// 		preflightContinue: false,
// 		optionsSuccessStatus: 204,
// 	})
// );

// BodyParser
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());
App.use(Access.Purchase);


App.use(Routes);

// Ignore favicon
App.use((req, res, next) => {
	if (res.url !== "/favicon.ico") {
		next();
	}
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
