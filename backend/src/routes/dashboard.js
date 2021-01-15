const Router = require("express").Router();
const Controller = require("../controllers/dashboard");

Router.get("/atividades", Controller.CountAtividades);
module.exports = Router;
