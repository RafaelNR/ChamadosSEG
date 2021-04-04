
const Result = require("../tools/result");
const Users = require('../models/user');
const Validate = require("../tools/validation/schemas");

const ImageUser = async (req, res) => {

  try {
    let Imagem = '';
    if (req.file && await tools.checkUser(req.body.id)) {
      Imagem = Validate.UploadImage({
				id: req.body.id,
				...req.file,
			});

      await Users.updateImage(Imagem)

		} else {
			throw "file não encontrado";
		}

		Result.ok(200, Imagem);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "uploads", "image-user");
	return res.status(Result.status).json(Result.res);

}


const tools = {
  async checkUser(user_id) {
    const user = await Users.countID(user_id)

    if (user === 1) {
      return true;
    }

    throw 'Erro em encontrar usuário.'


  },
}

module.exports = {
  ImageUser,
}