const moment = require('moment');
const Axios = require("../tools/axios");
const Model = require("../models/logs");
const Users = require("../models/user");
const Result = require("../tools/result");
const Validate = require("../tools/validation/schemas");

const resendAtividadesCliente = async (req, res) => {
	try {
		if (!req.query.id) throw "Erro em aceita a solicitação de reenvio.";

		const email = await tools.checkEmailAtividade(Validate.ID(req.query.id));

    const resp = await Axios.post(`/send/resend-atividades/`, email);
    console.log(resp);

		if (!resp.data.success) throw resp.data.message;
		
		Result.ok(200, {
		message: resp.data.message
		});

	} catch (error) {
		Result.fail(400, error);
	}

	return res.status(Result.status).json(Result.res);
};

const tools = {

  async checkEmailAtividade(ID) {
    const email = await Model.findOneEmail(ID);

    if (!email || email.type !== 'Relatório Mensal de Atividades')
      throw 'Email não existe ou seu tipo é inválido.'
    else if (!email.file)
      throw 'Email não possui atividades vinculadas.';

    return tools.handleDados(email);

  },

  async handleDados(email) {

    const [mes, ano, cliente_id] = email.file.split('-');
    
    const currAno = moment(ano).locale("pt-br").format("Y");
    const nameMes = moment(mes).locale("pt-br").format("MMMM");
    const tecnicos = await Users.findTecnicosByCliente(cliente_id);

    return {
			...email,
			dados: {
				data_ano: `${nameMes}/${currAno}`,
				tecnicos,
			},
		};

  }

};

module.exports = {
	resendAtividadesCliente,
};
