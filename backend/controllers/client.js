/* Models */
const Model = require("../models/client");
const { countActivityforClient } = require("../models/atividades");
const { countLinkedToClient } = require("../models/clients_has_users");

const Validate = require("../tools/validation/schemas"); /* Validation */
const Log = require("./log"); /* LOG */

/**
 * Respostadas das requisições, tratadas pelo controller.
 * @typedef {Object}
 */
let response;
let status = 200;

module.exports = {
	index: async (req, res) => {
		try {
			response = { success: true, data: await Model.index() };
		} catch (error) {
			status = 401;
			response = { success: false, message: "Error!", error };
		}

		Log.Save(req.userId, "client", "index", response);
		return res.status(status).json(response);
	},

	findOne: async (req, res) => {
		try {
			if (!req.params || !req.params.id) throw "Paramento não encontrado!";

			const { id } = Validate.ID({ id: parseInt(req.params.id) });

			await tools.checkIfExist(id);

			response = { success: true, data: await Model.findOne(id) };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "client", "findOne", response);
		return res.status(status).json(response);
	},

	insert: async (req, res) => {
		try {
			if (!req.body) throw "Informações não encontradas!";

			const Dados = tools.handilingInsert(req.body);
			await Model.insert(Dados);

			response = { success: true, data: Dados };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "client", "insert", response);
		return res.status(status).json(response);
	},

	update: async (req, res) => {
		try {
			if (!req.body || !req.params.id) throw "Informações não encontradas!";
			if (req.body.id !== parseInt(req.params.id)) throw "Valor são inválidos.";

			const Dados = await Model.update(await tools.handilingUpdate(req.body));

			response = { success: true, data: Dados };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "client", "update", response);
		return res.status(status).json(response);
	},

	delete: async (req, res) => {
		try {
			if (!req.params || !req.params.id) throw "Paramento não encontrado!";

			const client = Validate.ID({ id: req.params.id });

			await Model.delete(await tools.vefiryToDelete(client.id));

			response = { success: true };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "client", "delete", response);
		return res.status(status).json(response);
	},
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
