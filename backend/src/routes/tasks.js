const Router = require("express").Router();
const Controller = require("../controllers/tasks");
const ControllerAcm = require("../controllers/acm_tasks");
//const Permission = require("../middlewares/permission");

// Tasks
Router.get("/", Controller.index)
	.get("/user", Controller.indexMy)
	.get("/cliente/:client_id", Controller.indexMyCliente)
	.get("/:id", Controller.findOne)
	.post("/", Controller.insert)
	.put("/:id", Controller.update)
	.put("/:id/status", Controller.changeStatus) // Altera o status
	.put("/:id/owner", Controller.changeOwner); // Altera o proprietário

// Acompanhamento
Router.get("/acm/:task_id", ControllerAcm.indexByTask)
	.post("/acm/:task_id", ControllerAcm.insert)
	.put("/acm/:id", ControllerAcm.update);
//.delete("/acm/:id", ControllerAcm.deletar);

module.exports = Router;
