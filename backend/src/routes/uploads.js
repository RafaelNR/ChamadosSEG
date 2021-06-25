const Router = require("express").Router();
const { uploadChamado, uploadImage } = require("../middlewares/multer");
const Controller = require('../controllers/uploads');

Router
  .post(
    "/images/user",
    uploadImage.single("file"),
    Controller.ImageUser
  )
  .post("/chamado", uploadChamado.single("file"), Controller.Chamado);

module.exports = Router;
