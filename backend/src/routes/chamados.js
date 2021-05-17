const Router = require("express").Router();
const Controller = require("../controllers/chamados");
// const ControllerAcm = require("../controllers/acm_tasks");
//const Permission = require("../middlewares/permission");

// Tasks
Router.get("/", Controller.index)
	.get("/requerente/my", Controller.requerentesOneMe)
	.get("/requerente/user/:user_id", Controller.requerentesByUserID)
	.get("/atribuido/my", Controller.atribuidosOneMe)
	.get("/atribuido/user/:user_id", Controller.atribuidosByUserID)
	.get("/cliente/:cliente_id", Controller.indexByCliente)
	// .get("/:id", Controller.findOne)
	.post("/", Controller.insert)
	.put("/:id", Controller.update);
	// .put("/:id/status", Controller.changeStatus) // Altera o status
	// .put("/:id/owner", Controller.changeOwner); // Altera o proprietário

// Acompanhamento
// Router.get("/acm/:task_id", ControllerAcm.indexByTask)
// 	.post("/acm/:task_id", ControllerAcm.insert)
// 	.put("/acm/:id", ControllerAcm.update);
//.delete("/acm/:id", ControllerAcm.deletar);

module.exports = Router;
