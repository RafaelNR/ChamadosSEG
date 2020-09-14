const Validate = require("../tools/validation/schemas"); /* Validation */
const Model = require("../models/atividades"); /* Model */
const Log = require("./log"); /* LOG */

const { countClientByUser } = require("../models/clients_has_users");
const User = require("../models/user");
const Client = require("../models/client");

let response;
let status = 200;

/**
 * Todas as atividades.
 */
const index = async (req, res) => {
	try {
		response = { success: true, data: await Model.index() };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "atividade", "index", response);
	return res.status(status).json(response);
};

/**
 * Procura minhas atividade ou atividades dos clientes
 */
const indexMy = async (req, res) => {
	try {
		let Dados;
		const user_id = Validate.UserID(req.userId);

		/** Pesquisa pelo client_id */
		if (req.params.client) {
			const client_id = Validate.ClientID(req.params.clientID);
			Dados = await Model.indexMyCliente(
				tools.verifyClient(user_id, client_id)
			);
		} else {
			Dados = await Model.indexMy(user_id);
		}

		response = { success: true, data: Dados };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "atividade", "indexMy", response);
	return res.status(status).json(response);
};

/*
 *	Procurar uma unica atividade.
 */
const findOne = async (req, res) => {
	try {
		if (!req.params) throw "Parâmetros inválidos";

		const params = await tools.handlingParams(req.params);

		const Dados = await Model.findOne(params);

		if (!Dados) throw "Atividade não existe";

		response = { success: true, data: Dados };
	} catch (error) {
		status = 401;
		response = { success: false, error };
	}

	Log.Save(req.userId, "atividade", "findOne", response);
	return res.status(status).json(response);
};

/**
 * Insert de atividade
 */
const insert = async (req, res) => {
	try {
		if (!req.body) throw "Informações não encontradas!";

		const Dados = await tools.handlingInsert(req.body);
		await Model.insert(Dados);

		response = { success: true, data: Dados };
	} catch (error) {
		status = 401;
		response = { success: false, message: "Error!", error };
	}

	Log.Save(req.userId, "atividades", "insert", response);
	return res.status(status).json(response);
};

/**
 * Update
 */
const update = async (req, res) => {
	try {
		if (!req.body || !req.params.id) throw "Informações não encontradas!";
		if (req.body.id !== parseInt(req.params.id)) throw "Valor são inválidos.";

		const Dados = await Model.update(tools.handlingUpdate(req.body));

		response = { success: true, data: Dados };
	} catch (error) {
		status = 401;
		response = { success: false, message: "Error!", error };
	}

	Log.Save(req.userId, "update", "update", response);
	return res.status(status).json(response);
};

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
				return {
					...newDados,
					atividades: JSON.stringify(newDados.atividades),
				};
			})
			.catch((error) => {
				throw error;
			});
	},

	/**
	 * Trata os dados da atividade antes do Update;
	 * @param {Object} Dados
	 */
	handlingUpdate: (Dados) => {
		const newDados = Validate.updateAtividades(Dados);

		return {
			...newDados,
			atividades: JSON.stringify(newDados.atividades),
		};
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
	 * Verifica se já existe atividade do usuário da requisição para aquele cliente na data.
	 */
	verifyAtividade: async (Dados) => {
		const count = await Model.countByUserClient(Dados);

		if (count[0].id >= 1) {
			throw "Já existe atividades para esse cliente no dia informado.";
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
	indexMy,
	findOne,
	update,
	insert,
	tools,
};
