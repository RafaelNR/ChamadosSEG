const Validate = require("../tools/validation/schemas"); /* Validation */
const Model = require("../models/infos_atividades");
const Atividades = require('../models/atividades')
const Result = require('../tools/result');
const Ticket = require("../classes/ticket.class");


const insert = async (req, res) => {
	try {
		if (!req.body) throw "Informações não encontradas!";
		const Dados = await tools.handlingInsert({ user_id: req.userId, ...req.body });
		const ID = await Model.insert(Dados);

		Result.ok(201, await Model.findOne(ID));
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "infos_atividades", "insert");
	return res.status(Result.status).json(Result.res);
};

const update = async (req, res) => {
	try {
		if (!req.body) throw "Informações não encontradas!";
		const Dados = await tools.handlingUpdate({ user_id: req.userId, ...req.body });
		await Model.update(Dados);
		
		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "infos_atividades", "update");
	return res.status(Result.status).json(Result.res);
};


const deletar = async (req,res) => {
	try {
		if (!req.params.id) throw "Parâmetros inválidos";
		const ID = Validate.ID(req.params.id);
		Model.deletar(ID);

		Result.ok(204);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "infos_atividades", "delete");
	return res.status(Result.status).json(Result.res);
}


const tools = {
	handlingInsert: async (Dados) => {

		const newDados = Validate.insertInfoAtividades({
			...Dados,
			info_ticket: await Ticket.createdInfo(Dados.ticket, Dados.atividade_id),
		});

		await tools.isExistAtividade(newDados.atividade_id);
		return newDados;
	},

	handlingUpdate: (Dados) => {
		const newDados = Validate.updateInfoAtividades(Dados);
		return newDados;
	},
	
	isExistAtividade: async (atividade_id) => {
		const Atividade = await Atividades.countAtividadeByID(atividade_id);
		if(Atividade <= 0) throw 'Atividade não existe, informação não inserida.';
	},

}


module.exports = {
	insert,
	update,
	deletar
}