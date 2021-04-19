const moment = require("moment");
const { Crypt } = require("../tools/bcryp");
const Model = require('../models/recuperar');
const User = require('../models/user');
const Axios = require('../tools/axios');
const Result = require("../tools/result");


const order = async (req,res) => {

  try {
		if (!req.query.email) throw ("Campo email não foi preenchido.");

		const Dados = {
			hash: Crypt(req.query.email),
			user_email: req.query.email,
			ip_remote: req.connection.remoteAddress,
			access_code: `${Math.random() * (999 - 100) + 100}-${
				Math.random() * (999 - 100) + 100
			}`,
		};


    if (
			(await tools.checkEmailUser(Dados.user_email)) &&
			(await tools.checkDataAndSendEmail(Dados.user_email))
		) {
			await Model.insertOrder(Dados).then((resp) => {
				Axios.get(`/send/recuperar-senha?hash=${Dados.hash}`).then((resp) => {
					console.log(resp);
				});

				// Result.ok(200, {
				//   success: true,
				// });

				//     })
				//     .catch(() => {
				//       Model.deleteHash(Dados.hash);
				//       throw new Error(
				//         "Erro em enviar email. Por favor tente mais tarde."
				//       );
				//     });
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
    const access_code = req.query.access_code;
    const IP = req.connection.remoteAddress;
    res.send("OK");
  } catch (error) {
    console.log(erro);
  }

};


const tools = {

  async checkEmailUser(email) {
    const user = await User.findOneByEmail(email);
    
    if (user) return true;

    throw "Email não foi encontrado.";
    
  },

  async checkDataAndSendEmail(email) {

    const Dados = await Model.findOneByEmail(email);

    if (Dados) {
      const minutes = moment().diff(Dados.created_at, "minutes");
      if (minutes <= 1439 && Dados.send_at) throw "Solicitação é email enviado, aguarde 24hs para fazer uma nova.";
    }

    return true;

  }

}


module.exports = {
  order,
  access
}