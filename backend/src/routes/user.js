const Router = require("express").Router();
const Controller = require("../controllers/user");
//const Permission = require("../middlewares/permission");

Router.get("/", Controller.index);
Router.get("/:id", Controller.findOne);
Router.get("/atribuiveis/chamado/:requerente_id", Controller.getUsersAtribuiveis);
Router.get("/cliente/:cliente_id", Controller.getUsuariosByCliente)
Router.post("/", Controller.insert);
Router.put("/:id", Controller.update);
Router.put("/perfil/:id", Controller.updatePerfil);
Router.put("/actived/:id", Controller.actived);
Router.delete("/:id", Controller.deletar);

module.exports = Router;
