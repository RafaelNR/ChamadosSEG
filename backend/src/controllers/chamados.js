const Model = require("../models/chamados");
const Validate = require("../tools/validation/schemas");
const Result =  require('../tools/result');
const { countClientByUser } = require("../models/clients_has_users");
const { getRole,countID } = require('../models/user')
const { countID: countClienteID } = require('../models/client');

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

		const chamados = await Model.requerentesByUserID(userID);
		Result.ok(200, chamados);
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
		const Dados = await tools.handleFindOne(req.userId,chamado);
		
		Result.ok(200, Dados);
	} catch (error) {
		console.log(error);
		Result.fail(400, error);
	}


	Result.registerLog(req.userId, "chamados", "findOne");
	return res.status(Result.status).json(Result.res);
};

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Parâmetros inválidos";

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

const tools = {

	handlerInsert: async (Dados) => {
		const newDados = Validate.InsertChamado(Dados);
		const role_id = await tools.checkPermissionUserID(newDados);
		await tools.verifyUser(newDados)
		await tools.checkClienteIsExist(newDados.cliente_id);
		await tools.verifyVinculoCliente(role_id, newDados);
		
		return newDados;
	},
	handlerUpdate: async (Dados) => {
		const newDados = Validate.UpdateChamado(Dados);
		const role_id = await tools.checkPermissionUserID(newDados);

		if (Dados.cliente_id)
			throw "Você não pode alterar o cliente atribuído.";
		
		await tools.verifyStatus(Dados, role_id);
		await tools.checkChamadoIsExist(newDados);
		await tools.verifyUser(newDados);
		if (newDados.cliente_id) {
			await tools.checkClienteIsExist(newDados.cliente_id);
			await tools.verifyVinculoCliente(role_id, newDados);
		}

		return newDados;
	},
	handleFindOne: async (user_id, Chamado) => {
		
		if (!Chamado) throw "Chamado não existe.";
		
		const role_id = await getRole(user_id);

		if (role_id !== 3) return Chamado;

		if (!await countClientByUser(user_id, Chamado.cliente_id))
			throw 'Você não ter permissão para abrir esse chamado.'

		if (user_id !== Chamado.requerente_id && user_id !== Chamado.atribuido_id)
			throw "Você não ter permissão para abrir esse chamado.";
		

		return Chamado;
	},
	checkPermissionUserID: async (Dados) => {

		if (typeof Dados === 'object') {
						
			const role_id = await getRole(Dados.user_id);

			if (
				Dados.user_id === Dados.requerente ||
				Dados.user_id === Dados.atribuido
			)
				return role_id;
			
			if (!role_id) throw "Usuário não encontrado.";
				
			if (role_id === 3 && Dados.requerente && Dados.user_id !== Dados.requerente)
				throw "Você não tem permissão para requerer ou alterar chamados de outro usuário.";
			
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

		if (Dados.cliente_id) {			
			if (
				Dados.cliente_id &&
				!(await countClientByUser(Dados.user_id, Dados.cliente_id))
			)
				throw "Usuário sem vinculo com esse cliente.";
			else if (
				Dados.requerente &&
				!(await countClientByUser(Dados.requerente, Dados.cliente_id))
			)
				throw "Técnico requerente sem vinculo com esse cliente.";
			else if (
				Dados.atribuido &&
				!(await countClientByUser(Dados.atribuido, Dados.cliente_id))
			)
				throw "Técnico atribuido sem vinculo com esse cliente.";	
		}

		return true;


		
	},
	verifyUser: async (Dados) => {
		
		if (typeof Dados === 'object') {

			if(Dados.requerente && await countID(Dados.requerente) <= 0)
				throw "Técnico requerente não existe.";
			else if (Dados.atribuido && (await countID(Dados.atribuido)) <= 0)
				throw "Técnico atribuído não existe.";
			
		} else {
			if (await countID(Dados) <= 0) throw ('Usuário não existe.');
		}

		return true;
	},
	verifyStatus: async (Dados,role_id) => {

		if (Dados.status) {

			const Chamado = await Model.findOne(Dados.id);

			const listStatus = [
				'Aberto',
				'Em Andamento',
				'Pendente Aprovação',
				'Aprovado',
				'Finalizado',
			];

			if (!listStatus.includes(Dados.status))
				throw 'Status do chamado não é valido.';

			if (role_id !== 3) return true;
		
			const keyChamadoStatus = listStatus.findIndex((e) => e === Chamado.status);
			const keyStatus = listStatus.findIndex((e) => e === Dados.status);

			if (keyStatus < keyChamadoStatus)
				throw 'Você não tem permissão para retornar o status anterior do chamado.';

			if (keyChamadoStatus !== 3 && keyStatus === 4 && Dados.user_id !== Chamado.requerente_id)
				throw 'Você não pode finalizar o chamado sem ser o requerente ou sem a aprovação dele.';
		}
		return true;
	}

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
};