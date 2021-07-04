const moment = require("moment");
const { Crypt,Compare } = require("../tools/bcryp");
const Model = require('../models/recuperar_senha');
const User = require('../models/user');
const Axios = require('../tools/axios');
const Result = require("../tools/result");


const order = async (req,res) => {

  try {
		if (!req.query.email) throw ("Campo email não foi preenchido.");

		const Dados = {
			hash: Crypt(req.query.email),
			email: req.query.email,
			ip_remote: req.connection.remoteAddress,
		};

    if (
			(await tools.checkEmailUser(Dados.email)) &&
			(await tools.checkDataAndSendEmail(Dados.email))
		) {
			
			const id = await Model.insertOrder(Dados);

			if (!id) throw "Erro em fazer a solicitação. Tente novamente mais tarde.";

			const resp = await Axios.get(
				`/send/recuperar-senha?hash=${Dados.hash}`
			);

			if (!resp.data.success) {
				await Model.deleteHash(Dados.hash);
				throw resp.data.message;
			}

			Result.ok(200, {
				message: resp.data.message
			});

		} 

	} catch (error) {
    Result.fail(400, error);
  }

	return res.status(Result.status).json(Result.res);

}

const access = async (req, res) => {

	try {
    const hash = req.query.hash;
		const IP = req.connection.remoteAddress;

		Result.ok(200, {
			success: true,
			...await tools.validateHash(hash, IP)
		});
  } catch (error) {
		Result.fail(400, error);
  }
	return res.status(Result.status).json(Result.res);
};


const changePasswd = async (req, res) => {
	try {
		const Dados = req.body;

		const user = await tools.checkEmailUser(Dados.email)
		await tools.validateHash(Dados.hash, Dados.ip_remote);
		const newPasswd = Crypt(Dados.passwd);
		const Update = await User.updatePasswd(user.id, newPasswd);

		if (Update) {
			await Model.registerUsedAt(Dados.hash);
			Result.ok(200, {
				success: true,
				message: 'Sua senha foi atualizada!'
			});
		} else {
			throw 'Erro em atualizar a senha.'
		}

	} catch (error) {
		Result.fail(400, error);
	}
	return res.status(Result.status).json(Result.res);
}

const tools = {

  async checkEmailUser(email) {
		const user = await User.findOneByEmail(email);
		
    if (!user) throw "Email não foi encontrado.";

		return user;
    
  },

  async checkDataAndSendEmail(email) {

		const Dados = await Model.findOneByEmail(email);
		
		if (Dados) {
			const minutes = moment().diff(Dados.created_at, "minutes");
			if (minutes <= 1439 || Dados.send_at)
				throw "Solicitação já feita, aguarde 24hs para fazer uma nova.";
		}
  

    return true;

  },

	async validateHash(hash, ipRemote) {
		

		const Dados = await Model.findOneByHash(hash)

		if (!Dados) throw new Error('Hash não encontrada.');
		if (Dados.used_at) throw new Error('Hash já foi usada.');
		if (Dados.ip_remote !== ipRemote) throw new Error('IP de acesso diferente do IP da solicitação.')
		if (!Compare(Dados.email, hash)) throw new Error("Hash é invalida.");
		
		const minutesHash = moment().diff(Dados.created_at, "minutes");
		if (minutesHash >= 120 )
			throw new Error("A hash expirou, poís já se passaram 2hs da solicitação.");
		
		
		return Dados;
	}

}


module.exports = {
	order,
	access,
	changePasswd,
};