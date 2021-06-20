const Router = require("express").Router();
const Controller = require("../controllers/category");
//const Permission = require("../middlewares/permission");

//Router.all(["/", "/:id"], Permission.admin);

//* CATEGORIAS
Router.get("/", Controller.index);
Router.get("/:id", Controller.findOne);
Router.get("/:id/subcategoria", Controller.getSubCategoriaByCategoria);
Router.post("/", Controller.insert);
Router.put("/:id", Controller.update);
Router.delete("/:id", Controller.deletar);

module.exports = Router;
