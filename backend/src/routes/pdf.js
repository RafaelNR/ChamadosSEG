const Router = require("express").Router();
const Controller = require('../controllers/pdf');


//! SE ROLE FOR IGUAL TECNICO, SÓ PODE TIRAR RELATÓRIO DELE OU DO SEUS CLIENTES;

Router.get("/atividade/:ticket", Controller.Atividade);
Router.get("/atividades", Controller.Atividades);


module.exports = Router;
