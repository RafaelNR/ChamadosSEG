const Validate = require("../tools/validation/schemas"); /* Validation */
const Model = require("../models/user"); /* Model */
const Log = require("./log"); /* Log */
const { Crypt } = require("../tools/bcryp");
const ApiErrors = require('../tools/errors/api-errors');

let response;

async function index(req, res) {
	try {
		response = { success: true, data: await Model.index() };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "user", "index", response);
	return res.status(200).json(response);
}

async function findOne(req, res) {
	try {
		if (!req.params || !req.params.id) throw "Paramentos não encontrados!";

		const id = Validate.ID(parseInt(req.params.id));

		await tools.checkIfExist(id);

		response = {
			success: true,
			data: await Model.findOne(id),
		};
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "user", "findOne", response);
	return res.status(200).json(response);
}

async function insert(req, res) {
	try {
		if (!req.body) throw "Informações não encontradas!";

		const Dados = tools.handilingInsert(req.body);
		const userID = await Model.insert(Dados);

		// Remove o passwd
		delete Dados.userDados.passwd;

		response = { success: true, data: userID };
	} catch (error) {
		response = ApiErrors(res,error).sendCreateUpdateError();
	}
	Log.Save(req.userId, "user", "insert", response);
	return res.status(200).json(response);
}

async function update(req, res) {
	try {
		if (!req.body || !req.params.id) throw "Informações não encontradas!";
		if (req.body.id !== parseInt(req.params.id)) throw "Valor são inválidos.";

		await tools.checkIfExist(req.body.id);
		const Dados = tools.handilingUpdate(req.body);
		Promise.resolve( await Model.update(Dados));

		response = { success: true, data: await Model.findOne(Dados.userDados.id) };
	} catch (error) {
		response = ApiErrors(res,error).sendCreateUpdateError();
	}

	Log.Save(req.userId, "user", "update", response);
	return res.status(200).json(response);
}

async function deletar(req, res) {
	try {
		if (!req.params || !req.params.id) throw "Paramentos não encontrados!";
		const id = Validate.ID(parseInt(req.params.id));

		await tools.checkIfExist(id);

		await Model.desabilita(id);

		response = { success: true };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "user", "disabled", response);
	return res.status(200).json(response);
}

async function actived(req, res) {
	try {
		if (!req.params || !req.params.id) throw "Paramentos não encontrados!";
		const id = Validate.ID(parseInt(req.params.id));

		await tools.checkIfExist(id);

		await Model.actived(id);

		response = { success: true };
	} catch (error) {
		response = { success: false, error };
	}

	Log.Save(req.userId, "user", "actived", response);
	return res.status(200).json(response);
}

/**
 * Ferramentas para o modulo
 */
const tools = {
	handilingInsert(Dados) {
		// Sem Clients vinculado
		if (!Dados.clients) {
			let userDados = Validate.insertUser(Dados);
			userDados.passwd = Crypt(userDados.passwd);
			return { userDados };
		}

		// Com Clients vinculados
		const Clients = Dados.clients;
		delete Dados.clients;
		let newDados = {
			userDados: Validate.insertUser(Dados),
			clientsUser: Validate.clientsUser(Clients),
		};

		newDados.userDados.passwd = Crypt(newDados.userDados.passwd);
		return newDados;
	},

	handilingUpdate(Dados) {
		// Sem Clients vinculado
		if (!Dados.clients) {
			let userDados = Validate.updateUser(Dados);
			// se a senha dor alterada.
			if(userDados.passwd !== "******")
				userDados.passwd = Crypt(userDados.passwd);
			else
				delete userDados.passwd

			return { userDados };
		}

		// Com Clients vinculados
		const Clients = Dados.clients;
		delete Dados.clients;
		let newDados = {
			userDados: Validate.updateUser(Dados),
			clientsUser: Validate.clientsUser(Clients),
		};

		// Se a senha for alterada
		if(newDados.userDados.passwd !== "******")
			newDados.userDados.passwd = Crypt(newDados.userDados.passwd);
		else
			delete newDados.userDados.passwd

		return newDados;
	},
	async checkIfExist(userID) {
		const user = await Model.countID(userID);
		if (!user) throw "Usuário não existe.";
	},
};

module.exports = {
	index,
	findOne,
	insert,
	update,
	deletar,
	actived,
	/** Usado somente para teste. */
	tools,
};
