const Router = require("express").Router();
const Controller = require("../controllers/logs");


Router.get("/acessos", Controller.acessos);
// Router.get("/emails", Controller.Atividades);
// Router.get("/pdf", Controller.Atividades);

module.exports = Router;
