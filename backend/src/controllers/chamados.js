const Model = require("../models/chamados");
const Validate = require("../tools/validation/schemas");
const Result =  require('../tools/result');
const { countClientByUser } = require("../models/clients_has_users");
const { getRole,countID } = require('../models/user')
const { countID: countClienteID } = require('../models/client')

const index = async (req, res) => {
	try {
		await tools.checkPermissionUserID(req.userId);

		Result.ok(200, await Model.index());
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "chamados", "index");
	return res.status(Result.status).json(Result.res);
};

const requerentesOneMe = async (req, res) => {
	try {
		const userID = Validate.ID(req.userId);
		Result.ok(200, await Model.requerentesByUserID(userID));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "chamados", "requerentesOneMe");
	return res.status(Result.status).json(Result.res);
};

const requerentesByUserID = async (req, res) => {
	try {
		if (!req.params.user_id) throw "Usuário não encontrado;"
		await tools.checkPermissionUserID(req.userId);

		const userID = Validate.ID(req.params.user_id);
		await tools.verifyUser(userID);
		Result.ok(200, await Model.requerentesByUserID(userID));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "chamados", "requerentesByUserID");
	return res.status(Result.status).json(Result.res);
};

const atribuidosOneMe = async (req, res) => {
	try {
		const userID = Validate.ID(req.userId);
		Result.ok(200, await Model.atribuidosByUserID(userID));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "chamados", "atribuidosOneMe");
	return res.status(Result.status).json(Result.res);
};

const atribuidosByUserID = async (req, res) => {
	try {
		if (!req.params.user_id) throw "Usuário não encontrado;";
		await tools.checkPermissionUserID(req.userId);

		const userID = Validate.ID(req.params.user_id);
		await tools.verifyUser(userID);
		Result.ok(200, await Model.atribuidosByUserID(userID));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "chamados", "atribuidosByUserID");
	return res.status(Result.status).json(Result.res);
};

const indexByCliente = async (req, res) => {
	try {
		if (!req.params.cliente_id) throw "Cliente não encontrado.";

		const role_id = await getRole(req.userId);

		const cliente_id = Validate.ClientID(req.params.cliente_id);
		await tools.checkClienteIsExist(cliente_id);
		await tools.verifyVinculoCliente(role_id, {
			user_id: req.userId,
			cliente_id,
		});
		Result.ok(200, await Model.indexMyCliente(cliente_id));
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "tasks", "indexByCliente");
	return res.status(Result.status).json(Result.res);
};

const findOne = async (req, res) => {
	try {
		if (!req.params || !req.params.id) throw "Chamado inválidos.";
		const ID = Validate.ID(req.params.id);

		const chamado = await Model.findOne(ID);

		if (!chamado) throw "Chamado não existe.";

		Result.ok(200, await Model.findOne(ID));
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}


	Result.registerLog(req.userId, "chamados", "findOne");
	return res.status(Result.status).json(Result.res);
};

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Parametros inválidos";

		const chamado = await tools.handlerInsert({ ...req.body, user_id: req.userId });
		const chamadoID = await Model.insert(chamado);

		Result.ok(200, chamadoID);
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "chamados", "insert");
	return res.status(Result.status).json(Result.res);
};

const update = async (req, res) => {
	try {
		if (!req.body && !req.params.id)
			throw "Parametros inválidos";

		const chamado = await tools.handlerUpdate({ id: req.params.id, user_id: req.userId, ...req.body });
		await Model.update(chamado);
		Result.ok(200);
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}
	
	Result.registerLog(req.userId, "chamados", "update");
	return res.status(Result.status).json(Result.res);
};

// async function changeStatus(req, res) {
// 	try {
// 		if (!req.body && !req.body.id) throw "Parâmetros inválidos";
// 		if (!req.body && !req.body.status) throw "Parâmetros inválidos";

// 		const task_id = Validate.ID(req.body.id);
// 		const status = Validate.status(req.body.status);

// 		await tools.verifyTask(req.userId, task_id).then(async () => {
// 			await Model.update(task_id, { status });
// 		});

// 		Result.ok(200);
// 	} catch (error) {
// 		console.log(error);
// 		Result.fail(400, error);
// 	}

// 	Result.registerLog(req.userId, "tasks", "changeStatus");
// 	return res.status(Result.status).json(Result.res);
// }

// async function changeOwner(req, res) {
// 	try {
// 		if (!req.body && !req.body.id) throw "Parâmetros inválidos";
// 		if (!req.body && !req.body.owner_id) throw "Parâmetros inválidos";

// 		const task_id = Validate.ID(req.body.id);
// 		const owner_user_id = Validate.ID(req.body.owner_id);

// 		await tools.verifyTask(req.userId, task_id).then(async () => {
// 			await Model.update(task_id, { owner_user_id });
// 		});

// 		Result.ok(200);
// 	} catch (error) {
// 		console.log(error);
// 		Result.fail(400, error);
// 	}

// 	Result.registerLog(req.userId, "tasks", "changeOwner");
// 	return res.status(Result.status).json(Result.res);
// }

const tools = {

	handlerInsert: async (Dados) => {
		const newDados = Validate.InsertChamado(Dados);
		const role_id = await tools.checkPermissionUserID(newDados);
		await tools.verifyUser(newDados)
		await tools.checkClienteIsExist(newDados.cliente_atribuido);
		await tools.verifyVinculoCliente(role_id, newDados);
		
		return newDados;
	},
	handlerUpdate: async (Dados) => {
		const newDados = Validate.UpdateChamado(Dados);
		const role_id = await tools.checkPermissionUserID(newDados);

		if (role_id === 3 && Dados.tecnico_requerente)
			throw 'Você não pode alterar o técnico requerente.';
		
		if (role_id === 3 && Dados.cliente_atribuido)
			throw "Você não pode alterar o cliente atribuído.";
			
		await tools.checkChamadoIsExist(newDados);
		if (newDados.cliente_atribuido) {
			await tools.checkClienteIsExist(newDados.cliente_atribuido);
			await tools.verifyVinculoCliente(role_id, newDados);
		}

		await tools.verifyUser(newDados);

		return newDados;
	},
	checkPermissionUserID: async (Dados) => {

		if (typeof Dados === 'object') {
						
			const role_id = await getRole(Dados.user_id);

			if (
				Dados.user_id === Dados.tecnico_requerente ||
				Dados.user_id === Dados.tecnico_atribuido
			)
				return role_id;
			
			if (!role_id) throw "Usuário não encontrado.";
				
			if (role_id === 3 && Dados.tecnico_requerente && Dados.user_id !== Dados.tecnico_requerente)
				throw "Você não tem permissão para requerer atividade como outro usuário.";
			
			return role_id; 
		} else {
			const role_id = await getRole(Dados);
			if (!role_id) throw "Usuário não encontrado.";
			if (role_id === 3) throw "Você não tem permissão.";
			return role_id;
		}

	},
	checkChamadoIsExist: async (Dados) => {
		const chamado = await Model.countID(Dados.id);
		if (chamado <= 0) throw 'Chamado não existe.';
		return true;
	},
	checkClienteIsExist: async (cliente_id) => {
		const cliente = await countClienteID(cliente_id);
		if (!cliente) throw 'Cliente não existe.';
	},
	verifyVinculoCliente: async (role_id, Dados) => {

		if (role_id !== 3) return true;
		else if (
			Dados.cliente_id &&
			!(await countClientByUser(Dados.user_id, Dados.cliente_id))
		)
			throw "Usuário sem vinculo com esse cliente.";
		else if (
			Dados.tecnico_requerente &&
			!(await countClientByUser(
				Dados.tecnico_requerente,
				Dados.cliente_atribuido
			))
		)
			throw "Técnico requerente sem vinculo com esse cliente.";
		else if (
			Dados.tecnico_atribuido &&
			!(await countClientByUser(
				Dados.tecnico_atribuido,
				Dados.cliente_atribuido
			))
		)
			throw "Técnico atribuido sem vinculo com esse cliente.";	

		
	},
	verifyUser: async (Dados) => {
		

		if (typeof Dados === 'object') {

			if(Dados.tecnico_requerente && await countID(Dados.tecnico_requerente) <= 0)
				throw "Técnico requerente não existe.";
			else if (Dados.tecnico_atribuido && (await countID(Dados.tecnico_atribuido)) <= 0)
				throw "Técnico atribuído não existe.";
			
		} else {
			if (await countID(Dados) <= 0) throw ('Usuário não existe.');
		}

		return true;
	},

};

module.exports = {
	index,
	requerentesOneMe,
	requerentesByUserID,
	atribuidosOneMe,
	atribuidosByUserID,
	indexByCliente,
	findOne,
	update,
	insert,
	// changeStatus,
	// changeOwner,
};