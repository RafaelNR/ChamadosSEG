const Model = require("../models/client");
const { countActivityforClient } = require("../models/atividades");
const { countLinkedToClient, findClients } = require("../models/clients_has_users");
const Validate = require("../tools/validation/schemas");
const Result =  require('../tools/result');


const index = async (req, res) => {
	try {
		Result.ok(200,await Model.index());
	} catch (error) {
		console.log(error)
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "clients", "index");
	return res.status(Result.status).json(Result.res);
};

const findOne = async (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Paramento não encontrado!";

		const id = Validate.ID(parseInt(req.params.id));
		await tools.checkIfExist(id);

		Result.ok(200,await Model.findOne(id));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "clients", "findOne");
	return res.status(Result.status).json(Result.res);
};

async function findMyClientes(req, res) {
	try {
		Result.ok(200, await findClients(req.userId));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "clients", "findMyClientes");
	return res.status(Result.status).json(Result.res);
}

const findClientesByUsuario = async (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Paramento não encontrado!";

		const user_id = Validate.ID(parseInt(req.params.id));


		Result.ok(200, await Model.findClientesByUsuario(user_id));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "clients", "findOne");
	return res.status(Result.status).json(Result.res);
};

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Informações não encontradas!";

		const Dados = tools.handilingInsert({ ...req.body, user_id: req.userId });
		const clientID = await Model.insert(Dados);

		Result.ok(201, {id: clientID});
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "clients", "insert");
	return res.status(Result.status).json(Result.res);
};

const update = async (req, res) => {
	try {
		if (!req.body || !req.params.id) throw "Informações não encontradas!";
		if (req.body.id !== parseInt(req.params.id)) throw "Valor são inválidos.";

		const Dados = await Model.update(
			await tools.handilingUpdate({ ...req.body, user_id: req.userId }));

			Result.ok(200,Dados);
		} catch (error) {
			Result.fail(400, error);
		}

	Result.registerLog(req.userId, "clients", "update");
	return res.status(Result.status).json(Result.res);
};

const deletar = async (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Paramento não encontrado!";

		const id = Validate.ID(parseInt(req.params.id));

		await Model.delete(await tools.vefiryToDelete(id));

		Result.ok(200);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "clients", "delete");
	return res.status(Result.status).json(Result.res);
};

const tools = {
	handilingInsert(Dados) {
		return Validate.insertClient(Dados);
	},

	async handilingUpdate(Dados) {
		const newDados = Validate.updateClient(Dados);
		const client = await Model.findOne(newDados.id);

		if (!client) throw "Cliente não existe.";

		return newDados;
	},

	async checkIfExist(clientID) {
		const client = await Model.findOne(clientID);
		if (!client) throw "Cliente não existe.";
	},

	async vefiryToDelete(clientID) {
		await this.checkIfExist(clientID);

		if ((await countActivityforClient(clientID)) > 0)
			throw "Não pode deletar cliente com atividade vinculada.";

		if (await countLinkedToClient(clientID))
			throw "Não pode deletar cliente com usuário vinculado.";

		return clientID;
	},
};

module.exports = {
	index,
	findOne,
	findClientesByUsuario,
	insert,
	update,
	deletar,
	findMyClientes,
};
