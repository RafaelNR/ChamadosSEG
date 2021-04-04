const Router = require("express").Router();
const upload = require("../middlewares/multer");
const Controller = require('../controllers/uploads');

Router.post("/images/user", upload.single('file'), Controller.ImageUser);

module.exports = Router;
