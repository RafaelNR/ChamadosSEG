const Router = require("express").Router();
const Controller = require('../controllers/pdf');


//! SE ROLE FOR IGUAL TECNICO, SÓ PODE TIRAR RELATÓRIO DELE OU DO SEUS CLIENTES;

Router.get("/atividade/:ticket", Controller.Atividade);
Router.get("/atividades", Controller.Atividades);
Router.post("/liberacaototal", Controller.LiberacaoTotal);
Router.post("/liberacaositeapp", Controller.LiberacaoSiteApp);


module.exports = Router;
