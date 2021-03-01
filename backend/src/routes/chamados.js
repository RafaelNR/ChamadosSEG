const Router = require("express").Router();
const Controller = require("../controllers/chamados");
const Permission = require("../middlewares/permission");
const verifyToken = require("../middlewares/jwt");

// Router.get("/", verifyToken, Permission.admin, Controller.index);
// Router.get("/user", verifyToken, Controller.findAllByMy);

module.exports = Router;
