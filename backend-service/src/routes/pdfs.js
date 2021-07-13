const Router = require("express").Router();
const Controller = require("../controllers/pdfs");
const ServiceAtividadePDF = require('../services/AtividadePDF')
const ServiceAtividadesPDF = require('../services/ArividadesPDF')
const ServiceLiberacaoTotalPDF = require('../services/LiberacaoTotalPDF')
const ServiceLiberacaoSiteApp = require("../services/LiberacaoSiteApp");


// REQUISIÇÕES VINDAS DO SERVICE DE CREATEPDF, RENDER VIEW
Router.get("/liberacaototal", (req, res, next) => {
	Controller.LiberacaoTotal(req, res, next);
});

Router.get("/liberacaositeapp", (req, res, next) => {
	Controller.LiberacaoSiteApp(req, res, next);
});

// SERVIÇOS DE CRIAÇÃO DE PDFS

Router.get("/atividade/:ticket", (req, res, next) =>
	ServiceAtividadePDF.createPDF(req, res, next)
);

Router.get("/atividades", (req, res, next) => {
	ServiceAtividadesPDF.createPDF(req, res, next);
});

Router.post("/create/liberacaototal", (req, res, next) => {
	ServiceLiberacaoTotalPDF.createPDF(req, res, next);
});

Router.post("/create/liberacaositeapp", (req, res, next) => {
	ServiceLiberacaoSiteApp.createPDF(req, res, next);
});

module.exports = Router;