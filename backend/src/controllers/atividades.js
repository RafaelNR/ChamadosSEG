const Validate = require("../tools/validation/schemas"); /* Validation */
const Model = require("../models/atividades"); /* Model */
const Result =  require('../tools/result');

const { countClientByUser } = require("../models/clients_has_users");
const User = require("../models/user");
const Client = require("../models/client");
const Data = require("../tools/data");
const Ticket = require("../classes/ticket.class");

/**
 * Todas as atividades.
 */
const index = async (req, res) => {
	try {
		const Dados = Object.keys(req.query).length >= 1
			? await Model.filter(tools.handleFilter(req.query))
			: await Model.index();

		Result.ok(200, Dados);
	} catch (error) {
		console.log(error)
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "atividades", "index");
	return res.status(Result.status).json(Result.res);
};

const findAllByMy = async (req, res) => {
	const user_id = req.userId;
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

const findAllByMyClientes = async (req,res) => {
	try {
		const user_id = Validate.UserID(req.userId);
		const Dados = await Model.findAllByClientes(user_id);
		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "atividades", "findAllByMyClientes");
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

const findOneByTicket = async (req, res) => {
	try {
		if (!req.params.ticket) throw "Parâmetros inválidos";
		const ID = Validate.Ticket(req.params.ticket);
		const Dados = await Model.findOneByTicket(ID);

		if (!Dados) throw "Atividade não existe!";

		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "atividades", "findOne");
	return res.status(Result.status).json(Result.res);
}

const insert = async (req, res) => {
	try {
		if (!req.body) throw "Informações não encontradas!";
		const Dados = await tools.handlingInsert({ user_id: req.userId, ...req.body });
		console.log(Dados)
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

		Result.ok(200, { success: true });
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

		console.log(Dados)
		
		const newDados = Validate.insertAtividades({
			...Dados,
			ticket: await Ticket.created(),
		});

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

		console.log(Data.compareDateMaxDays(Atividade.date, 10))

		if(!Data.compareDateMaxDays(Atividade.date, 10)){
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

		if (count > 0)
			throw "Já existe atividades do seu usuário para esse cliente na data informada.";

		if (!Data.compareDateLargerToday(Dados.date))
			throw "Não é permitido criar um atividade com data maior que hoje.";

		if (!Data.compareDateMaxDays(Dados.date, 10))
			throw "Não é permitido criar um atividade com mais de 10 dias da data de hoje.";
			
		if (!Data.compareDateMonth(Dados.date))
			throw "Não é permitido criar uma atividade fora do mês atual.";		
		
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

	handleFilter(Dados) {
		return {
			data_inicial: Dados.data_inicial ? Dados.data_inicial : null,
			data_final: Dados.data_final ? Dados.data_final : null,
			cliente: Dados.cliente ? Dados.cliente : null,
			tecnico: Dados.tecnico ? Dados.tecnico : null,
		}
	}

};

module.exports = {
	index,
	findAllByMy,
	findAllByUser,
	findAllByMyClientes,
	findAllByCliente,
	findOne,
	findOneByTicket,
	update,
	insert,
	deletar,
	tools,
};
