const Validate = require("../tools/validation/schemas"); /* Validation */
const Model = require("../models/atividades"); /* Model */
const Result =  require('../tools/result');

const { countClientByUser } = require("../models/clients_has_users");
const User = require("../models/user");
const Client = require("../models/client");
const Data = require("../tools/data");

/**
 * Todas as atividades.
 */
const index = async (req, res) => {
	try {
		Result.ok(200,await Model.index());
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "index");
	return res.status(Result.status).json(Result.res);
};

const findAllByMy = async (req, res) => {
	const user_id = Validate.UserID(req.userId);
	try {
		const Dados = await Model.findByUser_id(user_id);
		Result.ok(200,Dados);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(user_id, "atividades", "findAllByMy");
	return res.status(Result.status).json(Result.res);
};

const findAllByUser = async (req, res) => {
	try {
		if (!req.params.user_id) throw 'Parametros inválidos.'
		const user_id = Validate.UserID(req.params.user_id);
		if(await User.countID(user_id) <= 0) throw 'Usuário não existe!'

		const Dados = await Model.findByUser_id(user_id);
		Result.ok(200,Dados);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "findAllByUser");
	return res.status(Result.status).json(Result.res);
};

const findAllByCliente = async (req,res) => {
	try {
		if (!req.params.cliente_id) throw 'Parametros inválidos.' 
		const cliente_id = Validate.ClientID(req.params.cliente_id);
		if(await Client.countID(cliente_id) <= 0) throw 'Cliente não existe!'
	
		Result.ok(200,await Model.findByClient_id(cliente_id));
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "findAllByCliente");
	return res.status(Result.status).json(Result.res);
};

const findOne = async (req, res) => {
	try {
		if (!req.params.id) throw "Parâmetros inválidos";
		const ID = Validate.ID(req.params.id)
		const Dados = await Model.findOne(ID);

		if (!Dados) throw "Atividade não existe!";

		Result.ok(200,Dados);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "findOne");
	return res.status(Result.status).json(Result.res);
};

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Informações não encontradas!";
		const Dados = await tools.handlingInsert({ user_id: req.userId, ...req.body });
		const ID = await Model.insert(Dados);

		Result.ok(201, await Model.findOne(ID));
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "insert");
	return res.status(Result.status).json(Result.res);
};

const update = async (req, res) => {
	try {
		if (!req.body || !req.params.id) throw "Parametros ou informações invalidas.";
		const Dados = await tools.handlingUpdate(req.body);
		await Model.update(Dados)

		Result.ok(204);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "update");
	return res.status(Result.status).json(Result.res);
};

const deletar = async (req,res) => {

	try {
		if (!req.body || !req.params.id) throw "Parametros ou informações invalidas.";

		const ID = Validate.ID(req.params.id);
		const Ativdade = await findOne(ID);

		if(!Ativdade) throw 'Atividade não existe';
		if(Ativdade.infos.length > 0) throw 'Impossível deletar atividade, poís já tem informações vinculada.';

		Model.deletar(ID);

		Result.ok(204);
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "deletar");
	return res.status(Result.status).json(Result.res);
}

const tools = {
	/**
	 * Trata os dados da atividade antes do Insert;
	 * @param {Object} Dados
	 */
	handlingInsert: async (Dados) => {

		const newDados = Validate.insertAtividades(Dados);

		return await tools
			.verifyAtividade(newDados)
			.then(() => {
				return newDados;
			})
			.catch((error) => {
				throw error;
			});
	},

	/**
	 * Trata os dados da atividade antes do Update;
	 * @param {Object} Dados
	 */
	handlingUpdate: async (Dados) => {
		const newDados = Validate.updateAtividades(Dados);
		const Atividade = await Model.findOne(Dados.id)

		// if(Atividade.user_id !== UserID) 
		// 	throw "Você ";

		if(!Data.compareDateMaxDays(Atividade.created_at, 7)){
			throw "Período para editar atividade ultrapassado.";
		}


		return newDados;
	},

	/**
	 * Trata qual tipo de busca vai ser feita.
	 * @param {Object} Dados
	 */
	handlingParams: async (Params) => {
		if (!Params) throw "Parâmetros não encontrados ou incorretos.";

		const { id, userID, clientID, data } = Params;

		if (id) {
			return { id: await Validate.ID(id) };
		} else if (userID && data) {
			// 	Usuário
			const newUserID = await Validate.UserID(userID);
			const countUser = await User.countID(newUserID);
			if (!countUser && countUser <= 0) throw "Usuario não existe";
			// Return
			return { userID, data: Validate.DiaMesAno(data) };
		} else if (clientID && data) {
			//Client
			const newClientID = await Validate.ClientID(clientID);
			const countClient = await Client.countID(newClientID);
			if (!countClient || countClient <= 0) throw "Cliente não existe";
			// Return
			return { clientID, data: Validate.DiaMesAno(data) };
		}
	},

	/**
	 * Verifica se já existe atividade do usuário da requisição para aquele cliente na data informada.
	 */
	verifyAtividade: async (Dados) => {
		const count = await Model.countByUserClientDate(Dados);

		if (count.id > 0) {
			throw "Já existe atividades para esse cliente no dia informado.";
		}

		if(!Data.compareDateMaxDays(Dados.date, 15)){
			throw "Não criar atividade com mais de 15 dias.";
		}

		return count;
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

};

module.exports = {
	index,
	findAllByMy,
	findAllByUser,
	findAllByCliente,
	findOne,
	update,
	insert,
	deletar,
	tools,
};
