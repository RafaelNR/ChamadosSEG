const Model = require("../models/modelos_chamado");
const Validate = require("../tools/validation/schemas");
const Result = require("../tools/result");

const index = async (req, res) => {
	try {
		Result.ok(200, await Model.index());
	} catch (error) {
		Result.fail(400, error);
	}
	return res.status(Result.status).json(Result.res);
};

const all = async (req, res) => {
	try {
		Result.ok(200, await Model.all());
	} catch (error) {
		Result.fail(400, error);
	}
	return res.status(Result.status).json(Result.res);
};

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Parâmetros inválidos.";

		const modelo = await Validate.InsertModelosChamado({
			user_id: req.userId,
			...req.body,
		});

		console.log(modelo)

		const ID = await Model.insert(modelo);

		console.log(ID)
		Result.ok(200, await Model.findOne(ID));
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "modelo", "insert");
	return res.status(Result.status).json(Result.res);
};


const update = async (req, res) => {
	try {
		if (!req.body && !req.params.id) throw "Parâmetros inválidos.";

		const modelo = await Validate.UpdateModelosChamado({
			id: req.params.id,
			user_id: req.userId,
			...req.body,
		});

		await Model.update(modelo);
		Result.ok(200, await Model.findOne(modelo.id));
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "modelo", "update");
	return res.status(Result.status).json(Result.res);
};

const deletar = async (req, res) => {
	try {
		if (!req.params.id) throw "Parâmetros inválidos.";

		await Model.deletar(req.params.id);
		Result.ok(200);
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "modelo", "update");
	return res.status(Result.status).json(Result.res);
};

module.exports = {
	index,
	all,
	insert,
	update,
	deletar
}