const Router = require("express").Router();
const Controller = require("../controllers/user");
//const Permission = require("../middlewares/permission");

Router.get("/", Controller.index);
Router.get("/:id", Controller.findOne);
Router.get('/clientes/my/:id', Controller.findMyClientes);
Router.get("/clientes/:id", Controller.findClientesByUser);
Router.get("/atribuiveis/chamado/:requerente_id", Controller.getUsersAtribuiveis);
Router.post("/", Controller.insert);
Router.put("/:id", Controller.update);
Router.put("/perfil/:id", Controller.updatePerfil);
Router.put("/actived/:id", Controller.actived);
Router.delete("/:id", Controller.deletar);

module.exports = Router;
