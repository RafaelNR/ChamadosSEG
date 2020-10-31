const Router = require("express").Router();
const Controller = require("../controllers/atividades");
const InfosController =  require("../controllers/info_atividades")
const Permission = require("../middlewares/permission");


Router.get("/", Permission.admin, Controller.index);
Router.get("/user", Controller.findAllByMy);
Router.get("/user/:user_id", Controller.findAllByUser);
Router.get("/cliente/:cliente_id", Controller.findAllByCliente);
Router.get("/:id", Controller.findOne);

// Router.get(
// 	["/user/:userID/:data", "/client/:clientID/:data"],
// 	Controller.findOne
// );

Router.post("/", Controller.insert);
Router.put("/:id", Controller.update);

Router.post("/infos", InfosController.insert);
Router.put("/infos/:id", InfosController.update);
Router.delete("/infos/:id", InfosController.deletar);

module.exports = Router;
