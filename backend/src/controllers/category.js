const Model = require("../models/category");
const Validate = require("../tools/validation/schemas");
const Result = require('../tools/result');
const CategoriasHasSubCategorias = require("../models/categorias_has_subcategorias");


const index = async (req, res) => {
	try {
		Result.ok(200,await Model.index());
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "categorias", "index");
	return res.status(Result.status).json(Result.res);
};

const findOne = async (req, res) => {
	try {
		if (!req.params || !req.params.id)
			throw "Parâmetros não encontrados ou incorretos.";

		const Dados = await tools.isExist(Validate.ID(req.params.id)).then(async (ID) => await Model.findOne(ID))

		Result.ok(200,Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "categorias", "findOne");
	return res.status(Result.status).json(Result.res);
};

const getSubCategoriaByCategoria = async (req,res) => {
		try {
			if (!req.params || !req.params.id)
				throw "Parâmetros não encontrados ou incorretos.";

			const Dados = await tools
				.isExist(Validate.ID(req.params.id))
				.then(
					async (ID) =>
						await CategoriasHasSubCategorias.findSubCategoriasByCategoriaID(ID)
				);

			Result.ok(200, Dados);
		} catch (error) {
			Result.fail(400, error);
		}

		Result.registerLog(req.userId, "categorias", "getSubCategoria");
		return res.status(Result.status).json(Result.res);
};


const insert = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";
		const Dados = tools.handlerInsert(req.body, req.userId);

		const ID = await Model.insert(Dados);
		Result.ok(201,await Model.findOne(ID));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "categorias", "insert");
	setTimeout(async() => {
		return res.status(Result.status).json(Result.res);
	}, 1000)
};

const update = async (req, res) => {
	try {
		if (!req.body) throw "Dados inválidos!";

		const Dados = await tools.handlerUpdate(req.body, req.userId);

		const newData = await Promise.all(await Model.update(Dados))
													.then(() => Model.findOne(Dados.categoria.id))

		Result.ok(200,newData);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "categorias", "update");
	return res.status(Result.status).json(Result.res);
};

const deletar = (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Dados inválidos";

		const id = Validate.ID(req.params.id);

		tools.isExist(id);
		Model.deletar(id);

		Result.ok(200);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "categorias", "delete");
	return res.status(Result.status).json(Result.res);
};

const tools = {
	handlerInsert: (Dados, userID) => {

		if(Dados.subCategorias && Dados.subCategorias.length === 0) 
			throw 'Deve selecionar pelo menos uma Sub-Categoria' 
		
		const categoria = Validate.insertCategoria({ nome: Dados.nome, user_id: userID });
		const subCategorias = Validate.subCategorias_array(Dados.subCategorias);

		return {
			categoria,
			subCategorias,
		}

		
	},
	handlerUpdate: (Dados, userID) => {

		if(Dados.subCategorias && Dados.subCategorias.length === 0) 
			throw 'Deve selecionar pelo menos uma Sub-Categoria' 

		return tools.isExist(Dados.id).then(() => {

			const categoria = Validate.updateCategoria({ id: Dados.id, nome: Dados.nome, user_id: userID });
			const subCategorias = Validate.subCategorias_array(Dados.subCategorias);

			return {
				categoria,
				subCategorias,
			}
		})
		

	},
	async isExist(ID) {
		const count = await Model.countCategoria(ID);
		if (!count || count <= 0) throw "Categoria não existe";
		return ID;
	},

};

module.exports = {
	index,
	findOne,
	getSubCategoriaByCategoria,
	insert,
	update,
	deletar,
	tools,
};
