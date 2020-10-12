const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;
const ApiErrors = require('../tools/errors/api-errors');

module.exports = (req, res) => {
	/**
	 * Verifica nos acessos que usarem jwt.
	 */
	const token = req.headers.access_token;

	console.log('token',token)

	if (!token || token.length <= 10) {
		return ApiErrors(res,{ message: "Precisa efetuar o login para acessar a página." }).AuthErrors();
	}

	jwt.verify(token, config.SECRET, function (err) {
		if (err) {
			console.log(err)
			return ApiErrors(res,{ message: "Autenticação expirou ou não é mais valida." }).AuthErrors();
		} else {
			return res.status(200).json({
				success: true,
				auth: true,
			});
		}
	});
};
