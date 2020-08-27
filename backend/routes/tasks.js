const Router = require("express").Router();
const Controller = require("../controllers/tasks");
//const Permission = require("../middlewares/permission");

Router.get("/", Controller.index)
	.get("/:id", Controller.findOne)
	.post("/", Controller.insert)
	.put("/:id", Controller.update)
	// Altero o status
	.put("/:id/:status", Controller.changeStatus)
	// altero o proprietário
	.put("/:id/:owner_id", Controller.changeOwner);

module.exports = Router;
