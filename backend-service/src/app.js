const Express = require('express')
const Cors = require('cors')
const Helmet = require('helmet')
const Access = require('./middlewares/access') 
const Routes = require('./routes/index')

const App = Express();

App.use("/tmp", Access.Purchase, Express.static("tmp"));
App.use(Cors())
App.use(Helmet());
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
	res.status(404).json({
		code: 404,
		success: false,
		message: error.message,
    error: error.stack,
	});
	next();
});

module.exports = App
