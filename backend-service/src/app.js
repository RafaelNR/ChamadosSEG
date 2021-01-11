const Express = require('express')
const Cors = require('cors')
const Helmet = require('helmet')
const Access = require('./middlewares/access') 
const Routes = require('./routes/index')

const App = Express();

App.use(Helmet());
App.use("/tmp", Express.static("tmp"));

//CORS
const whiteList = ["http://localhost:3000", "http://localhost"];
App.use(
	Cors({
		origin: whiteList,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);
App.use(Access.Purchase);

App.use(Routes)

// Ignore favicon
App.use((req, res, next) => {
	if (res.url !== "/favicon.ico") {
		next();
	}
});

// Erro genérico 
App.use((error, req, res, next) => {
	console.log(error)
	res.status(404).json({
		code: 404,
		success: false,
		message: error.message,
		error: process.env.NODE_ENV === "dev" ? error.stack : "",
	});
	next();
});

module.exports = App
