const Model = require("../models/logs");
const Result = require('../tools/result')

const acessos = async (req, res) => {
	try {
			Result.ok(200, await Model.acessos());
		} catch (error) {
			Result.fail(400, error);
	}
	
		Result.registerLog(req.userId, "log", "acessos");
		return res.status(Result.status).json(Result.res);
}

const emails = async (req, res) => {
	try {
		Result.ok(200, await Model.emails());
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "log", "emails");
	return res.status(Result.status).json(Result.res);
};

const pdfs = async (req, res) => {
	try {
		Result.ok(200, await Model.pdfs());
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "log", "pdfs");
	return res.status(Result.status).json(Result.res);
};

module.exports = {
	acessos,
	emails,
	pdfs
};
