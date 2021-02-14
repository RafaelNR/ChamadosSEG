const Router = require("express").Router();
const Controller = require("../controllers/dashboard");

Router.get("/my/atividades", Controller.CountAtividades);
Router.get("/my/clientes", Controller.CountAtividadesMyClientes);
Router.get("/my/cliente/:cliente_id", Controller.CountAtividadesCliente);

module.exports = Router;
