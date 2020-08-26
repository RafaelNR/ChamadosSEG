const Validate = require("../tools/validation/schemas"); /* Validation */
const Model = require("../models/user"); /* Model */
const Log = require("./log"); /* Log */
const { Crypt } = require("../tools/bcryp");

let response;
let status = 200;

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
			let userDados = Validate.insertUser(Dados);
			userDados.passwd = Crypt(userDados.passwd);
			return { userDados };
		}

		// Com Clients vinculados
		const Clients = Dados.clients;
		delete Dados.clients;
		let newDados = {
			userDados: Validate.updateUser(Dados),
			clientsUser: Validate.clientsUser(Clients),
		};

		newDados.userDados.passwd = Crypt(newDados.userDados.passwd);
		return newDados;
	},
	async checkIfExist(userID) {
		const user = await Model.countID(userID);
		if (!user) throw "Usuário não existe.";
	},
};

module.exports = {
	async index(req, res) {
		try {
			response = { success: true, data: await Model.index() };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "user", "index", response);
		return res.status(status).json(response);
	},

	async findOne(req, res) {
		try {
			if (!req.params || !req.params.id) throw "Paramentos não encontrados!";

			const { id } = Validate.ID({ id: req.params.id });

			await tools.checkIfExist(id);

			response = {
				success: true,
				data: await Model.findOne(id),
			};
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "user", "findOne", response);
		return res.status(status).json(response);
	},

	async insert(req, res) {
		try {
			if (!req.body) throw "Informações não encontradas!";

			const Dados = tools.handilingInsert(req.body);
			await Model.insert(Dados);

			response = { success: true, data: Dados };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "user", "insert", response);
		return res.status(status).json(response);
	},

	async update(req, res) {
		try {
			if (!req.body || !req.params.id) throw "Informações não encontradas!";
			if (req.body.id !== parseInt(req.params.id)) throw "Valor são inválidos.";

			const Dados = tools.handilingUpdate(req.body);

			await tools.checkIfExist(Dados.id);

			response = { success: true, data: await Model.update(Dados) };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "user", "update", response);
		return res.status(status).json(response);
	},

	async delete(req, res) {
		try {
			if (!req.params || !req.params.id) throw "Paramentos não encontrados!";

			const { id } = Validate.ID({ id: req.params.id });

			await tools.checkIfExist(id);

			await Model.desabilita(id);

			response = { success: true };
		} catch (error) {
			status = 401;
			response = { success: false, error };
		}

		Log.Save(req.userId, "user", "desabilite", response);
		return res.status(status).json(response);
	},

	/** Usado somente para teste. */
	tools,
};
