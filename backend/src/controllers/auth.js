const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;
const Result =  require('../tools/result');

module.exports = (req, res) => {
	/**
	 * Verifica nos acessos que usarem jwt.
	 */
	const token = req.headers.access_token;
	console.log(token)

	if (!token || token.length <= 10) {
		return res.status(401).json(Result.auth(false,"Sem token vinculado, favor fazer login."));
	}

	jwt.verify(token, config.SECRET, function (err) {
		if (err) {
			return res.status(401).json(Result.auth(false,"Autenticação expirou ou não é mais valida."));
		} else {
			return res.status(200).json({
				success: true,
				auth: true,
			});
		}
	});
};
