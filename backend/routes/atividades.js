const Router = require("express").Router();
const Controller = require("../controllers/atividades");
const Permission = require("../middlewares/permission");

module.exports = () => {
	/**
	 * Todas as Atividades, somente admin.
	 */
	Router.get("/", Permission.admin, Controller.index);

	/**
	 * Todas as minhas Atividades, pelo meu id ou por um dos meus clients;
	 */
	Router.get(["/user", "/client/:client"], Controller.indexMy);

	/**
	 * Uma única atividade.
	 */
	Router.get(
		["/:id", "/user/:userID/:data", "/client/:clientID/:data"],
		Controller.findOne
	);

	/**
	 * CRUD
	 */
	Router.post("/", Controller.insert);
	/**
	 * TODO
	 * Somente admin ou quem abriu.
	 */
	Router.put("/:id", Controller.update);
	/**
	 * TODO
	 * Delete, somente admin ou quem abriu.
	 */

	return Router;
};
