const Router = require("express").Router();
const Controller = require("../controllers/recuperar_senha");


Router.get("/", Controller.access);
Router.post("/", Controller.order);
Router.put("/", Controller.changePasswd);


module.exports = Router;
