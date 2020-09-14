const Model = require("../models/category");
const Validate = require("../tools/validation/schemas"); /* Validation */
const Log = require("./log"); /* LOG */

let response;
let status = 200;

const index = async (req, res) => {
	try {
		response = { success: true, data: await Model.index() };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "category", "index", response);
	return res.status(status).json(response);
};

const findOne = async (req, res) => {
	try {
		if (!req.params || !req.params.id)
			throw "Parametros não encontrados ou incorretos.";

		const ID = Validate.ID(req.params.id);

		await tools.checkIfExist(ID);

		response = { success: true, data: await Model.findOne(ID) };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "category", "findOne", response);
	return res.status(status).json(response);
};

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";
		const Dados = tools.handlerInsert(req.body, req.userId);

		const id = await Model.insert(Dados);

		response = { success: true, data: { id: id } };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "category", "insert", response);
	return res.status(status).json(response);
};

const update = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";

		const Dados = tools.handlerUpdate(req.body, req.userId);

		await Model.update(Dados);

		response = { success: true, data: Dados };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "category", "update", response);
	return res.status(status).json(response);
};

const deletar = (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Dados invalidos";

		const id = Validate.ID(req.params.id);

		tools.checkBeforeDeletar(id);
		Model.deletar(id);

		response = { success: true };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "category", "delete", response);
	return res.status(status).json(response);
};

const tools = {
	handlerInsert: (Dados, userID) => {
		return Validate.insertCategoria({ nome: Dados.nome, user_id: userID });
	},
	handlerUpdate: (Dados, userID) => {
		const newDados = Validate.updateCategoria({ ...Dados, user_id: userID });
		tools.checkIfExist(newDados.id);
		return newDados;
	},
	/**
	 * Verifica se a categoria existe;
	 * @param {number} ID
	 */
	async checkIfExist(ID) {
		const count = await Model.countCategoria(ID);
		if (!count || count <= 0) throw "Categoria não existe";
	},
	/**
	 * Verifica se o ID da categoria está vinculado a alguma subcategoria
	 * @param {number} ID
	 */
	async checkBeforeDeletar(ID) {
		this.checkIfExist(ID);
		return ID;
	},
};

module.exports = {
	findOne,
	insert,
	index,
	update,
	deletar,
	tools,
};
