const Model = require("../models/sub_category");
const Validate = require("../tools/validation/schemas"); /* Validation */
const Log = require("./log"); /* LOG */

let response;
let status = 200;

/**
 *+ Pesquisa todas as sub-categorias 
 */
const index = async (req, res) => {
	try {
		response = { success: true, data: await Model.index() };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "sub-category", "index", response);
	return res.status(status).json(response);
};


/**
 ** Pesquisa uma sub-categoria
 */
const findOne = async (req, res) => {
	try {
		if (!req.params || !req.params.id)
			throw "Parametros não encontrados ou incorretos.";

		const ID = Validate.ID(req.params.id);

		await tools.checkIfExist(ID);

		response = { success: true, data: await Model.findOne(ID) };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "category", "findOne", response);
	return res.status(status).json(response);
};

/**
 ** Pesquisa todas as sub-categorias de um categoria.
 */
const findByCategory = async (req, res) => {
	
	try {
		if (!req.params || !req.params.id)
			throw "Parametros não encontrados ou incorretos.";
		
		const ID = Validate.ID(req.params.id);

		response = { success: true, data: await Model.findCategoria(ID) };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "sub-category", "findByCategory", response);
	return res.status(status).json(response);
};

/**
 ** Insere um categoria
 */
const insert = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";
		const Dados = await tools.handlerInsert({ ...req.body, user_id: req.userId });

		response = { success: true, data: { id: await Model.insert(Dados) } };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "sub-category", "insert", response);
	return res.status(status).json(response);
};

/**
 ** Update da Categoria
 */
const update = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";

		const Dados = await tools.handlerUpdate({ ...req.body, user_id: req.userId  });

		await Model.update(Dados);

		response = { success: true, data: Dados };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "sub-category", "update", response);
	return res.status(status).json(response);
};

const deletar = async (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Dados invalidos";

		const id = Validate.ID(req.params.id);

		await tools.checkIfExist(ID);
		await Model.deletar(id);

		response = { success: true };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "sub-category", "delete", response);
	return res.status(status).json(response);
};

const tools = {
	/**
	 * & 
	 * @param {Object} Dados
	 */
	async handlerInsert(Dados) {
		const newDados = Validate.insertSubCategoria(Dados);

		if (!(await this.checkBeforeAction(newDados))) {
			throw "Já existe essa sub-categoria, vinculado a categoria.";
		}

		return newDados;
	},

	/**
	 * &
	 * @param {Object} Dados
	 */
	async handlerUpdate(Dados) {
		const newDados = Validate.updateSubCategoria(Dados);

		await this.checkIfExist(newDados.id);

		if (!(await this.checkBeforeAction(newDados))) {
			throw "Já existe essa sub-categoria, vinculado a categoria.";
		}
		return newDados;
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
	checkIfExist: async (ID) => {
		const dbDados = await Model.countByID(ID);
		if (!dbDados || dbDados.id <= 0) {
			throw "SubCategoria não existe.";
		}
		return;
	},

};

module.exports = {
	index,
	findOne,
	findByCategory,
	insert,
	update,
	deletar,
	tools,
};
