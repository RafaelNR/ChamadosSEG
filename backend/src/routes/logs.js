const Router = require("express").Router();
const Controller = require("../controllers/logs");

Router.get("/acessos", Controller.acessos);
Router.get("/emails", Controller.emails);
Router.get("/pdfs", Controller.pdfs);

module.exports = Router;
