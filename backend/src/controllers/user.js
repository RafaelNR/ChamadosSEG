const Validate = require("../tools/validation/schemas");
const Model = require("../models/user");
const { Crypt } = require("../tools/bcryp");
const Result =  require('../tools/result');

async function index(req, res) {
	try {
		Result.ok(200,await Model.index());
	} catch (error) {
		Result.fail(400,error);
	}

	Result.registerLog(req.userId, "user", "index");
	return res.status(Result.status).json(Result.res);
}

async function findOne(req, res) {
	try {
		if (!req.params || !req.params.id) throw "Paramentos não encontrados!";

		const id = Validate.ID(parseInt(req.params.id));
		await tools.checkIfExist(id);

		Result.ok(200,await Model.findOne(id));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "user", "findOne");
	return res.status(Result.status).json(Result.res);
}

async function insert(req, res) {
	try {
		if (!req.body) throw "Informações não encontradas!";

		const Dados = tools.handilingInsert(req.body);
		const userID = await Model.insert(Dados);

		// Remove o passwd
		delete Dados.userDados.passwd;

		Result.ok(201,{ id: userID[0] });
	} catch (error) {
		Result.fail(400, error);
	}
	Result.registerLog(req.userId, "user", "insert");
	return res.status(Result.status).json(Result.res);
}

async function update(req, res) {
	try {
		if (!req.body || !req.params.id) throw "Informações não encontradas!";
		if (req.body.id !== parseInt(req.params.id)) throw "Valor são inválidos.";

		await tools.checkIfExist(req.body.id);
		const Dados = tools.handilingUpdate(req.body);
		await Model.update(Dados);
		
		Result.ok(200, await Model.findOne(Dados.userDados.id));
	} catch (error) {
		Result.fail(400, error);
	}
	Result.registerLog(req.userId, "user", "update");
	return res.status(Result.status).json(Result.res);
}

async function deletar(req, res) {
	try {
		if (!req.params || !req.params.id) throw "Paramentos não encontrados!";
		const id = Validate.ID(parseInt(req.params.id));

		await tools.checkIfExist(id).then(() => {
			Model.desabilita(id);
		})

		Result.ok(200);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "user", "disabled");
	return res.status(Result.status).json(Result.res);
}

async function actived(req, res) {
	try {
		if (!req.params || !req.params.id) throw "Paramentos não encontrados!";
		const id = Validate.ID(parseInt(req.params.id));

		await tools.checkIfExist(id).then(() => {
			Model.actived(id);
		})
		Result.ok(200);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "user", "actived");
	return res.status(Result.status).json(Result.res);
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
