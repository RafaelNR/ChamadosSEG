const Atividades = require("../models/atividades");
// const Validate = require("../tools/validation/schemas");
const Result = require("../tools/result");

const CountAtividades = async (req, res) => {
	try {
		const UserID = req.userId

		console.log(req.userId)

		const Dados = {
			open: (await Atividades.findMyOpen(UserID)).length,
			half: (await Atividades.findMyHalfOpen(UserID)).length,
			last: (await Atividades.findMyLastDayOpen(UserID)).length,
			close: (await Atividades.findMyClose(UserID)).length,
		};

		console.log(Dados)


		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	return res.status(Result.status).json(Result.res);
};


module.exports = {
	CountAtividades,
};