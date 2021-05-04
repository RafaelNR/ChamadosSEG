const Model = require("../models/logs");
const Result = require('../tools/result')


const acessos = async (req, res) => {
	try {
			Result.ok(200, await Model.acessos());
		} catch (error) {
			Result.fail(400, error);
	}
	
		Result.registerLog(req.userId, "log", "index");
		return res.status(Result.status).json(Result.res);
}

module.exports = {
	acessos
};
