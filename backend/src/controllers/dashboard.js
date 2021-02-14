const Atividades = require("../models/atividades");
// const Validate = require("../tools/validation/schemas");
const Result = require("../tools/result");

const CountAtividades = async (req, res) => {
	try {
		const UserID = req.userId

		const Dados = {
			open: (await Atividades.findByUser_id(UserID, "open")).length,
			half: (await Atividades.findByUser_id(UserID, "half")).length,
			last: (await Atividades.findByUser_id(UserID, "last")).length,
			close: (await Atividades.findByUser_id(UserID, "close")).length,
		};

		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	return res.status(Result.status).json(Result.res);
};

const CountAtividadesMyClientes = async (req,res) => {

	try {
		const UserID = req.userId;

		const Dados = {
			open: (await Atividades.findAllByClientes(UserID, "open")).length,
			half: (await Atividades.findAllByClientes(UserID, "half")).length,
			last: (await Atividades.findAllByClientes(UserID, "last")).length,
			close: (await Atividades.findAllByClientes(UserID, "close")).length,
		};


		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	return res.status(Result.status).json(Result.res);

}

const CountAtividadesCliente = async (req, res) => {
	try {
		const ClienteID = req.params.cliente_id;


		const Dados = {
			open: (await Atividades.findByClient_id(ClienteID, "open")).length,
			half: (await Atividades.findByClient_id(ClienteID, "half")).length,
			last: (await Atividades.findByClient_id(ClienteID, "last")).length,
			close: (await Atividades.findByClient_id(ClienteID, "close")).length,
		};

		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	return res.status(Result.status).json(Result.res);
};


module.exports = {
	CountAtividades,
	CountAtividadesMyClientes,
	CountAtividadesCliente,
};
