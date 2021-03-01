const Router = require("express").Router();
const Controller = require("../controllers/dashboard");

Router.get("/atividades/my_user", Controller.CountAtividades);
Router.get("/atividades/my_clientes", Controller.CountAtividadesMyClientes);
Router.get("/atividades/all", Controller.CountAtividadesAll);
Router.get("/atividades/my_cliente/:cliente_id", Controller.CountAtividadesCliente);

module.exports = Router;
