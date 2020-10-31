const Model = require("../models/permissoes");

/**
 * Fazer validação do usuário.
 */
const admin = async (req, res, next) => {
	const role_id = await Model.checkRole(parseInt(req.userId));
	if (parseInt(role_id) === 1) {
		next();
	} else {
		return res.status(403).json({
			message: false,
			error: "Você não ter permissão",
		});
	}
};

const analista = async (req, res, next) => {
	const role_id = await Model.checkRole(parseInt(req.userId));

	if (parseInt(role_id) <= 2) {
		next();
	} else {
		return res.status(403).json({
			message: false,
			error: "Você não ter permissão",
		});
	}
};

const tecnico = async (req, res, next) => {
	const role_id = await Model.checkRole(parseInt(req.userId));

	if (parseInt(role_id) <= 3) {
		next();
	} else {
		return res.status(403).json({
			success: false,
			message: "Você não ter permissão",
		});
	}
};

module.exports = {
	admin,
	analista,
	tecnico,
};
