const Model = require("../models/acm_tasks");
const Validate = require("../tools/validation/schemas"); /* Validation */
const Log = require("./log"); /* LOG */

let response;
let status = 200;

const indexByTask = async (req, res) => {
	try {
		if (!req.params && !req.params.task_id) throw "Parametros inválidos";

		const task_id = Validate.ID(req.params.task_id);

		const acm = await Model.indexByTask(task_id);

		response = { success: true, data: acm };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "acm_tasks", "index", response);
	return res.status(status).json(response);
};

const insert = (req, res) => {
	try {
		if (!req.body || (!req.params && req.params.task_id))
			throw "Parametros inválidos";

		const Dados = {
			...req.body,
			user_id: req.userId,
			task_id: req.params.task_id,
		};

		const acm = tools.handlerInsert(Dados);

		const acm_task_id = Model.insert(acm);
		response = { success: true, data: acm_task_id };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "acm_tasks", "index", response);
	return res.status(status).json(response);
};

const update = async (req, res) => {
	try {
		if (!req.body || (!req.params && req.params.id))
			throw "Parametros inválidos";

		const Dados = {
			id: req.params.id,
			...req.body,
			user_id: req.userId,
			task_id: req.body.task_id,
		};

		const acm = tools.handlerUpdate(Dados);

		await Model.update(acm);

		response = { success: true };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "acm_tasks", "update", response);
	return res.status(status).json(response);
};

// const deletar = async (req, res) => {
// 	try {
// 		if (!req.parms && !req.params.id) throw "Parametros inválidos";

// 		const id = Validate.ID(req.params.id);

// 		await Model.deletar(id);

// 		response = { success: true };
// 	} catch (error) {
// 		status = 401;
// 		response = { success: false, error };
// 	}

// 	Log.Save(req.userId, "acm_tasks", "update", response);
// 	return res.status(status).json(response);
// };

const tools = {
	handlerInsert: (Dados) => {
		return Validate.InsertAcmTask(Dados);
	},
	handlerUpdate: (Dados) => {
		if (tools.permissionUpdate(Dados)) {
			return Validate.UpdateAcmTask(Dados);
		}
	},

	/**
	 * Verifica se o usuário tem permissão para editar o acompanhamento.
	 */
	permissionUpdate: async (Dados) => {
		const dbAcm = await Model.findOne(Dados.id);

		if (dbAcm.user_id != Dados.user_id)
			throw "Você não tem permissão para editar esse acompanhamento";

		return true;
	},
};

module.exports = {
	indexByTask,
	insert,
	update,
	//deletar,
};
