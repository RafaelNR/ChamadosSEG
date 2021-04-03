const Router = require('express').Router()

// Controllers
const Atividade = require('../controllers/Atividade')
const Atividades = require('../controllers/Atividades')
const Email = require('../controllers/Email')

Router.use('/pdf', require('./pdfs'));

Router.get("/atividade/:ticket", (req, res, next) =>
	Atividade.render(req, res, next)
);
Router.get("/atividades", (req, res, next) => {
	Atividades.render(req, res, next);
});

Router.get('/send/email', (req, res, next) => {
	Email.Enviar(req, res, next);
})
Router.post('/send/email', (req, res, next) => {
	Email.Enviar(req, res, next);
})


// Página não existe
Router.use((req, res, next) => {
	const error = new Error(`Erro pagina não existe -> Path: ${req.originalUrl}`);
	next(error);
});

module.exports = Router;