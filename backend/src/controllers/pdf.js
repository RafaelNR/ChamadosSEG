const axios = require("../tools/axios")
const Moment = require("moment");
const Model = require("../models/atividades");
const Validate = require("../tools/validation/schemas");
const Result = require("../tools/result");

const { countID: countCliente } = require('../models/client');
const { countID: countUser } = require("../models/user");
const { countClientByUser } = require('../models/clients_has_users');
const { getRole } = require('../models/user');

const Atividade = async (req,res) => {
	try {
		const ticket = req.params.ticket;
		if (!ticket) throw new Error("ticket não existe.");

		const Atividade = await Model.countAtividadeByTicket(ticket);

		if (Atividade <= 0)
			throw "Ticket não existe.";

		const resp = await axios.get(`/pdf/atividade/${ticket}?user_id=${req.userId}`);

		if (resp.status === 200 && resp.data.success) {
			Result.ok(200, resp.data);
		} else {
			throw resp.data.message ? resp.data.message : "Erro em gerar o PDF.";	
		}

	} catch (error) {
		Result.fail(404, error);
	}

	Result.registerLog(req.userId, "PDF", "Atividade");
	return res.status(Result.status).json(Result.res);
};

const Atividades = async (req,res) => {

	try {

		if (!req.query) new Error('Sem dados para consulta.');
		
    const Query = Validate.PDFAtividades(req.query);
		
    await tools.validate(req.userId, Query);
		
    const URL = tools.getUrl(Query);
		
		
		if (URL) {

			const resp = await axios.get(`${URL}&user_id=${req.userId}`);

			if (resp.status === 200 && resp.data.success) {
				Result.ok(200, resp.data);
			} else {
				throw resp.data.message ? resp.data.message : "Erro em gerar o PDF.";	
			}

		} else {
			throw "URL não encontrada, pdf não foi gerado.";
		}

		
	} catch (error) {
		Result.fail(404,error);
	}

	Result.registerLog(req.userId, "PDF", "Atividade");
	return res.status(Result.status).json(Result.res);

}

const LiberacaoTotal = async (req, res) => {
	try {
		if (!req.body && !req.body.ip) new Error("Dados não encontrados.");

		const resp = await axios.post(`/pdf/create/liberacaototal`, {
			...req.body,
			user_id: req.userId
		})

		if (resp.status === 200 && resp.data.success) {
			Result.ok(200, resp.data);
		} else {
			throw resp.data.message
				? resp.data.message
				: "Erro em gerar o PDF.";
		}

	} catch (error) {
		Result.fail(404, error);
	}
	return res.status(Result.status).json(Result.res);
}

const LiberacaoSiteApp = async (req, res) => {
	try {
		if (!req.body && !req.body.ip) new Error("Dados não encontrados.");

		const resp = await axios.post(`/pdf/create/liberacaositeapp`, {
			...req.body,
			user_id: req.userId,
		});

		if (resp.status === 200 && resp.data.success) {
			Result.ok(200, resp.data);
		} else {
			throw resp.data.message ? resp.data.message : "Erro em gerar o PDF.";
		}
	} catch (error) {
		Result.fail(404, error);
	}
	return res.status(Result.status).json(Result.res);
};

const tools = {

	validate: async (userID, Query) => {
		if (Query.cliente) {
      await tools.validateCliente(userID,Query.cliente);
    } else if (userID, Query.tecnico) {
      await tools.validateTecnico(userID,Query.tecnico)
		}
	},

  validateTecnico: async (userID, tecnico_id) => {

    if ((await countUser(tecnico_id)) <= 0) throw "Técnico não existe.";

    if(await tools.checkRole(tecnico_id) === 3 && userID !== tecnico_id) throw 'Você só pode tirar relatório do seu cliente.'

  },

	validateCliente: async (userID,cliente_id) => {
    
    if ((await countCliente(cliente_id)) <= 0) throw "Cliente não existe.";

    //& -> Se maior que analista passa.
    if (await tools.checkRole(userID) === 3 && await countClientByUser(userID, cliente_id) <= 0) throw "Cliente não tem vinculo com seu usuário.";
    
  },
  
  checkRole: async (tecnico_id) => {

    const role_id = await getRole(tecnico_id); 
    if (role_id === 3) throw `Você não ter permissão para gerar esse relatório.`;
    return role_id

  },

  getUrl: (Query) => {
		if (Query.data_inicial && Query.data_final && (Query.cliente || Query.tecnico)) {
			return `/pdf/atividades?data_inicial=${Moment(
				Query.data_inicial
			).format("YYYY-MM-DD")}&data_final=${Moment(Query.data_final).format(
				"YYYY-MM-DD"
			)}&${
				Query.cliente ? "cliente=" + Query.cliente : "tecnico=" + Query.tecnico
			}`;
		} else if (Query.mes && Query.ano && (Query.cliente || Query.tecnico)) {
			return `/pdf/atividades?mes=${Query.mes}&ano=${
				Query.ano
			}&${
				Query.cliente ? "cliente=" + Query.cliente : "tecnico=" + Query.tecnico
			}`;
    }
	},

};

module.exports = {
	Atividade,
	Atividades,
	LiberacaoTotal,
	LiberacaoSiteApp,
};
