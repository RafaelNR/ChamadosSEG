const Router = require("express").Router();
const Controller = require("../controllers/chamados");
const ControllerAcm = require("../controllers/acm_chamados");
//const Permission = require("../middlewares/permission");

// Tasks
Router.get("/", Controller.index)
	.get("/requerente/my", Controller.requerentesOneMe)
	.get("/requerente/user/:user_id", Controller.requerentesByUserID)
	.get("/atribuido/my", Controller.atribuidosOneMe)
	.get("/atribuido/user/:user_id", Controller.atribuidosByUserID)
	.get("/cliente/:cliente_id", Controller.indexByCliente)
	.get("/:id", Controller.findOne)
	.post("/", Controller.insert)
	.put("/:id", Controller.update);
	// .put("/status/:id/", Controller.changeStatus) // Altera o status
	// .put("/prioridade/:id/", Controller.changePrioridade); // Altera o proprietário
	// .put('/atribuir/:id',Controller.changeAtribuido)

// Acompanhamento
Router.get("/acm/:chamado_id", ControllerAcm.findAcompanhamentosByChamado)
			.post("/acm/", ControllerAcm.insert)
			.put("/acm/:id", ControllerAcm.update);
//.delete("/acm/:id", ControllerAcm.deletar);

module.exports = Router;
