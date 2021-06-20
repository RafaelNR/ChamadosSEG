const Router = require("express").Router();
const Controller = require("../controllers/subcategory");
//const Permission = require("../middlewares/permission");

//Router.all(["/", "/:id"], Permission.admin);

//* SUBCATEGORIAS
Router.get("/", Controller.index);
Router.get('/:id', Controller.findOne);
Router.post('/', Controller.insert);
Router.put("/:id", Controller.update);
Router.delete("/:id", Controller.deletar);

module.exports = Router;
