const Validate = require("../tools/validation/schemas"); /* Validation */
const Log = require("./log"); /* LOG */

let response;
let status = 200;

module.exports = {
	index: (req, res) => {
		try {
			resposne = "";
		} catch (error) {
			resposne = "";
		}

		Log.Save(req.userId, "tasks", "index", response);
		return res.status(status).json(response);
	},

	findOne: (req, res) => {},

	insert: (req, res) => {},

	update: (req, res) => {},
};
