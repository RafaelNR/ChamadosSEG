
const Result = require("../tools/result");
const Users = require('../models/user');
const Chamados = require('../models/chamados');
const AcmChamados = require('../models/acm_chamados');
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
			throw "Imagem não encontrado";
		}

		Result.ok(200, Imagem);
	} catch (error) {
		Result.fail(400,error);
	}

	return res.status(Result.status).json(Result.res);

}

const Chamado = async (req, res) => {

  try {

    if (req.file && await tools.checkChamado(req.body.id)) {

      const Dados = {
				tipo: 2,
				chamado_id: req.body.id,
				descricao: JSON.stringify(req.file),
				user_id: req.userId,
			};

      const acm = await AcmChamados.findOne(await AcmChamados.insert(Dados));
      
      Result.ok(200, acm);
    }else{
      throw "Arquivo não encontrado";
    }
    
  } catch (error) {
    Result.fail(400, error);
  }
  return res.status(Result.status).json(Result.res);
};



const tools = {
  async checkUser(user_id) {
    const user = await Users.countID(user_id)

    if (user === 1) {
      return true;
    }

    throw 'Erro em encontrar usuário.'
  },
  async checkChamado(chamado_id) {
    const chamado = await Chamados.countID(chamado_id)

    if (chamado === 1) {
      return true;
    }

    throw 'Erro em encontrar chamado.'
  }
}

module.exports = {
  ImageUser,
  Chamado
}