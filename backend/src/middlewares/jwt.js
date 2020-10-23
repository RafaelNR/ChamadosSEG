const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;
const ApiErrors = require('../tools/errors/handle');

module.exports = (req, res, next) => {
	/**
	 * Verifica nos acessos que usarem jwt.
	 */
	const token = req.headers.access_token;

	if (!token) return ApiErrors(res,{ message: "Precisa efetuar o login para acessar a página." }).AuthErrors();

	jwt.verify(token, config.SECRET, function (err, decoded) {
		if (err) {
			return res.status(401).json({
				success: false,
				auth: false,
				token: null,
				message: "Autenticação expirou.",
			});
		}

		// Set o user ip do usuário
		req.userId = decoded.id;
	});

	next();
};
