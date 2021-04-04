const Router = require("express").Router();
const ServiceAtividadePDF = require('../services/AtividadePDF')
const ServiceAtividadesPDF = require('../services/ArividadesPDF')

Router.get("/atividade/:ticket", (req, res, next) =>
	ServiceAtividadePDF.createPDF(req, res, next)
);

Router.get("/atividades", (req, res, next) => {
	ServiceAtividadesPDF.createPDF(req, res, next);
});

module.exports = Router;