const Router = require("express").Router();
const Controller = require("../controllers/chamados");
const ControllerAcm = require("../controllers/acm_chamados");
const ControllerModelos = require("../controllers/modelos_chamado");
const Permission = require("../middlewares/permission");

// Tasks
Router.get("/", Controller.index)
	.get("/requerentes/my", Controller.requerentesOneMe)
	.get("/requerentes/user/:user_id", Controller.requerentesByUserID)
	.get("/atribuidos/my", Controller.atribuidosOneMe)
	.get("/atribuidos/user/:user_id", Controller.atribuidosByUserID)
	.get("/cliente/:cliente_id", Controller.indexByCliente)
	.get("/:id", Controller.findOne)
	.post("/", Controller.insert)
	.put("/:id", Controller.update);
	// .put("/status/:id/", Controller.changeStatus) // Altera o status
	// .put("/prioridade/:id/", Controller.changePrioridade); // Altera o proprietário
	// .put('/atribuir/:id',Controller.changeAtribuido)

// Acompanhamento
Router.get("/acm/:chamado_id", ControllerAcm.findAcompanhamentosByChamado)
			.get("/acm/count/type", ControllerAcm.CountTypeAcompanhamentos)
			.post("/acm/", ControllerAcm.insert)
			.put("/acm/:id", ControllerAcm.update)
			.delete("/acm/:id", ControllerAcm.deletar);
			
// Modelos de chamados
Router.get("/modelos/index", ControllerModelos.index)
			.get("/modelos/all", ControllerModelos.all)
			.post("/modelos", Permission.admin, ControllerModelos.insert)
			.put("/modelos/:id", Permission.admin, ControllerModelos.update)
			.delete("/modelos/:id", Permission.admin, ControllerModelos.deletar);
			

module.exports = Router;
