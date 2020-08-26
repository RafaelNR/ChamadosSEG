const Router = require("express").Router();
const Controller = require("../controllers/client");

module.exports = () => {
	Router.get("/", Controller.index);
	Router.get("/:id", Controller.findOne);
	Router.post("/", Controller.insert);
	Router.put("/:id", Controller.update);
	Router.delete("/:id", Controller.delete);

	return Router;
};
