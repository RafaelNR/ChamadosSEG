const Atividades = require("../models/atividades");
// const Validate = require("../tools/validation/schemas");
const Result = require("../tools/result");

const CountAtividades = async (req, res) => {
	try {
		const UserID = req.userId

		const Dados = {
			open: await Atividades.countAtividadesByUserID(UserID, "open"),
			half: await Atividades.countAtividadesByUserID(UserID, "half"),
			last: await Atividades.countAtividadesByUserID(UserID, "last"),
			close: await Atividades.countAtividadesByUserID(UserID, "close"),
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
			open: await Atividades.countAtividadesMyClientes(UserID, "open"),
			half: await Atividades.countAtividadesMyClientes(UserID, "half"),
			last: await Atividades.countAtividadesMyClientes(UserID, "last"),
			close: await Atividades.countAtividadesMyClientes(UserID, "close"),
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
			open: await Atividades.countAtividadesByClienteID(ClienteID, "open"),
			half: await Atividades.countAtividadesByClienteID(ClienteID, "half"),
			last: await Atividades.countAtividadesByClienteID(ClienteID, "last"),
			close: await Atividades.countAtividadesByClienteID(ClienteID, "close"),
		};

		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	return res.status(Result.status).json(Result.res);
};

const CountAtividadesAll = async (req, res) => {
	
		try {

			const Dados = {
				open: await Atividades.countAtividades("open"),
				half: await Atividades.countAtividades("half"),
				last: await Atividades.countAtividades("last"),
				close: await Atividades.countAtividades("close"),
			};

			Result.ok(200, Dados);
		} catch (error) {
			Result.fail(400, error);
		}

		return res.status(Result.status).json(Result.res);
}

module.exports = {
	CountAtividades,
	CountAtividadesMyClientes,
	CountAtividadesCliente,
	CountAtividadesAll
};
