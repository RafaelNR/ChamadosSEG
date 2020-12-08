const Model = require("../models/log");
const Result = require('../tools/result')


const index = async (req, res) => {
	try {
			Result.ok(200, await Model.index());
		} catch (error) {
			Result.fail(400, error);
	}
	
		Result.registerLog(req.userId, "log", "index");
		return res.status(Result.status).json(Result.res);
}

module.exports = {
	index
};
