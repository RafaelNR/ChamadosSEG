const Model = require("../models/user");
const Result = require("../tools/result");

async function Perfil(req, res) {
	try {
		Result.ok(200, await Model.findOne(req.userId));
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "perfil", "myperfil");
	return res.status(Result.status).json(Result.res);
}

module.exports = Perfil