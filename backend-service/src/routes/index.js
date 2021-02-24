const Router = require('express').Router()

// Controllers
const Atividade = require('../controllers/Atividade')
const Atividades = require('../controllers/Atividades')
const Email = require('../controllers/Email')

Router.get("/pdf/atividade/:ticket", (req, res, next) =>
	Atividade.createPDF(req, res, next)
);

Router.get('/pdf/atividades', (req, res, next) => {
	Atividades.createPDF(req, res, next);
})

Router.get('/send/email', (req, res, next) => {
	Email.Enviar(req, res, next);
})

Router.post('/send/email', (req, res, next) => {
	Email.Enviar(req, res, next);
})

// Router.get("/atividade/email/:ticket", Atividade.submitEmailWithPDF);

// Router.get("/atividades/pdf", Atividades.createPDF);
// Router.get("/atividades/email", Atividades.submitEmailWithPDF);

// Página não existe
Router.use((req, res, next) => {
	const error = new Error(`Erro pagina não existe -> Path: ${req.originalUrl}`);
	next(error);
});

module.exports = Router;