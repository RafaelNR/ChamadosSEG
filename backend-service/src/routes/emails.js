const Router = require("express").Router();
const Email = require("../controllers/Email");
const RecuperarSenha = require('../controllers/RecuperarSenha')

Router.get("/recuperar-senha", (req, res, next) => {
	RecuperarSenha(req, res, next);
});

Router.get("/email", (req, res, next) => {
	Email.Enviar(req, res, next);
});
Router.post("/email", (req, res, next) => {
	Email.Enviar(req, res, next);
});



module.exports = Router;
