const Router = require("express").Router();
const Controller = require("../controllers/atividades");
const InfosController =  require("../controllers/info_atividades")
const Permission = require("../middlewares/permission");
const verifyToken = require("../middlewares/jwt");

Router.get("/", verifyToken, Permission.admin, Controller.index);
Router.get("/user", verifyToken, Controller.findAllByMy);
Router.get("/user/:user_id", Controller.findAllByUser);

Router.get("/clientes", Controller.findAllByClientes);
Router.get("/cliente/:cliente_id", Controller.findAllByCliente);

Router.get("/:id", verifyToken, Controller.findOne);

Router.get("/ticket/:ticket", verifyToken, Controller.findOneByTicket);

Router.post("/", verifyToken, Controller.insert);
Router.put("/:id", verifyToken, Controller.update);

Router.post("/infos", verifyToken, InfosController.insert);
Router.put("/infos/:id", verifyToken, InfosController.update);
Router.delete("/infos/:id", verifyToken, InfosController.deletar);

module.exports = Router;
