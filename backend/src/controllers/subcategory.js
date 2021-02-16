const Model = require("../models/subcategory");
const CategoriaHasSub = require('../models/categorias_has_subcategorias')
const Validate = require("../tools/validation/schemas");
const Result =  require('../tools/result');


const index = async (req, res) => {
	try {
		Result.ok(200,await Model.index());
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "sub-categorias", "index");
	return res.status(Result.status).json(Result.res);
};

const findOne = async (req, res) => {
	try {
		if (!req.params || !req.params.id)
			throw "Parametros não encontrados ou incorretos.";

		const ID = Validate.ID(req.params.id);

		await tools.isExist(ID);

		Result.ok(200,await Model.findOne(ID));
	} catch (error) {
		Result.fail(400,error);
	}


	Result.registerLog(req.userId, "sub-categorias", "findOne");
	return res.status(Result.status).json(Result.res);
};


const insert = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";
		const Dados = await tools.handlerInsert({ ...req.body, user_id: req.userId });

		const ID = await Model.insert(Dados);

		Result.ok(201, await Model.findOne(ID));
	} catch (error) {
		Result.fail(400,error);
	}


	Result.registerLog(req.userId, "sub-categorias", "insert");
	return res.status(Result.status).json(Result.res);
};

const update = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";

		const Dados = await tools.handlerUpdate({ ...req.body, user_id: req.userId  });

		await Model.update(Dados);

		Result.ok(200, await Model.findOne(Dados.id));
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "sub-categorias", "update");
	return res.status(Result.status).json(Result.res);
};

const deletar = async (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Dados inválidos";

		const id = Validate.ID(req.params.id);

		await tools.handleDelete(id);
		//await Model.deletar(id);

		Result.ok(200);
	} catch (error) {
		Result.fail(400, error);
	}


	Result.registerLog(req.userId, "sub-categorias", "delete");
	return res.status(Result.status).json(Result.res);
};

const tools = {

	async handlerInsert(Dados) {
		const newDados = Validate.insertSubCategoria(Dados);
		return newDados;
	},


	async handlerUpdate(Dados) {
		const newDados = Validate.updateSubCategoria(Dados);
		await this.isExist(newDados.id);
		return newDados;
	},

	async handleDelete(ID) {
		await tools.isExist(ID);

		const Dados = await CategoriaHasSub.findCategoriaBySubCategoriaID(ID)

		if (Dados.length > 0)
			throw 'Sub-Categoria ainda vinculada a um categoria.'

	},

	/**
	 * & Verifica se já existe sub-categoria para categoria_id
	 * @param {Object} Dados
	 */
	checkBeforeAction: async (Dados) => {
		const dbDados = await Model.findCategoria(Dados.categoria_id);
		const Check = dbDados.filter((d) => d.nome === Dados.nome);
		return Check && Check.length > 0 ? false : true;
	},

	/**
	 * & Verifica se a categoria existe.
	 * @param {number} ID
	 */
	isExist: async (ID) => {
		const dbDados = await Model.countByID(ID);
		if (!dbDados || dbDados.id <= 0) {
			throw "Sub-Categoria não existe.";
		}
		return;
	},

};

module.exports = {
	index,
	findOne,
	insert,
	update,
	deletar,
	tools,
};
