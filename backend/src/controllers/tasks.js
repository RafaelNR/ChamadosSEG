const Model = require("../models/tasks");

const { countClientByUser } = require("../models/clients_has_users");
const Validate = require("../tools/validation/schemas");
const Log = require("./logs");

let response;
let status = 200;

const index = async (req, res) => {
	try {
		response = { success: true, data: await Model.index() };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "index", response);
	return res.status(status).json(response);
};

const indexMy = async (req, res) => {
	try {
		const userID = Validate.ID(req.userId);
		response = { success: true, data: await Model.indexMy(userID) };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "indexMy", response);
	return res.status(status).json(response);
};

const indexMyCliente = async (req, res) => {
	try {
		if (!req.params && !req.params.client_id) throw "Parâmetros inválidos";

		const client_id = Validate.ClientID(req.params.client_id);

		tools.verifyClient(req.userId, client_id);
		response = { success: true, data: await Model.indexMyCliente(client_id) };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "indexMyClients", response);
	return res.status(status).json(response);
};

const findOne = async (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Parametros inválidos";

		const ID = Validate.ID(req.params.id);
		response = { success: true, data: await Model.findOne(ID) };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "findOne", response);
	return res.status(status).json(response);
};

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Parametros inválidos";

		// Insert Task
		const task = tools.handlerInsert(req.body);
		const taskID = await Model.insert(task);

		response = { success: true, data: taskID };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "insert", response);
	return res.status(status).json(response);
};

const update = async (req, res) => {
	try {
		if (!req.body && req.body.id !== req.params.id)
			throw "Parametros inválidos";

		const task = tools.handlerUpdate(req.body);

		if (tools.checkUpdate(req.userId, task)) {
			await Model.update(task.id, task);
		}

		response = { success: true };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "insert", response);
	return res.status(status).json(response);
};

async function changeStatus(req, res) {
	try {
		if (!req.body && !req.body.id) throw "Parâmetros inválidos";
		if (!req.body && !req.body.status) throw "Parâmetros inválidos";

		const task_id = Validate.ID(req.body.id);
		const status = Validate.status(req.body.status);

		await tools.verifyTask(req.userId, task_id).then(async () => {
			await Model.update(task_id, { status });
		});

		response = { success: true };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "chengeStatus", response);
	return res.status(status).json(response);
}

async function changeOwner(req, res) {
	try {
		if (!req.body && !req.body.id) throw "Parâmetros inválidos";
		if (!req.body && !req.body.owner_id) throw "Parâmetros inválidos";

		const task_id = Validate.ID(req.body.id);
		const owner_user_id = Validate.ID(req.body.owner_id);

		await tools.verifyTask(req.userId, task_id).then(async () => {
			await Model.update(task_id, { owner_user_id });
		});

		response = { success: true };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "tasks", "chengeOwner", response);
	return res.status(status).json(response);
}

const tools = {
	/**
	 * Trata os dado para insert
	 */
	handlerInsert: (Dados) => {
		return Validate.InsertTask({
			...Dados,
			status: "Aberto",
		});
	},
	/*
	 * Trata os dados para update
	 */
	handlerUpdate: (Dados) => {
		return Validate.UpdateTask(Dados);
	},
	/**
	 * Verifica se o usuário tem permissão para editar task
	 */
	checkUpdate: async (user_id, Dados) => {
		const dbTask = await Model.findOne(Dados.id);

		if (dbTask.proprietario_id !== user_id && dbTask.user_id !== user_id)
			throw "Você não tem permissão para alterar essa tarefa";

		return true;
	},
	/**
	 * Verifica se o client selecionado está vinculado ao usuário da requisição.
	 */
	verifyClient: (user_id, client_id) => {
		if (countClientByUser(user_id, client_id) <= 0) {
			throw "Você não está vinculado a esse cliente";
		}

		return client_id;
	},

	/**
	 * Verifica se task existe e se o usuário tem permissão de altera-la.
	 */
	verifyTask: async (user_id, task_id) => {
		const task = await Model.findOne(task_id);

		if (!task) throw "Tarefa não existe";

		if (task && (await countClientByUser(user_id, task.cliente_id)) <= 0) {
			throw "Você não está vinculado a esse cliente";
		}

		return true;
	},
};

module.exports = {
	index,
	indexMy,
	indexMyCliente,
	findOne,
	update,
	insert,
	changeStatus,
	changeOwner,
};
