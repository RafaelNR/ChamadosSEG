const Router = require("express").Router();
const Email = require("../controllers/Email");

Router.get("/recuperar-senha",Email.RecuperarSenha)
Router.post("/resend-atividades", Email.ReenviaAtividades);

// Router.get("/email", (req, res, next) => {
// 	Email.Enviar(req, res, next);
// });
// Router.post("/email", (req, res, next) => {
// 	Email.Enviar(req, res, next);
// });



module.exports = Router;
