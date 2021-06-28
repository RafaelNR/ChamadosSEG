const Model = require("../models/modelos_chamado");
// const Validate = require("../tools/validation/schemas");
const Result = require("../tools/result");

const index = async (req, res) => {
	try {
		Result.ok(200, await Model.index());
	} catch (error) {
		Result.fail(400, error);
	}
	return res.status(Result.status).json(Result.res);
};


module.exports = {
  index
}