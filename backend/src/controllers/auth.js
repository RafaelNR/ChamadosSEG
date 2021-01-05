const jwt = require("jsonwebtoken");
const Result =  require('../tools/result');

module.exports = (req, res) => {
	/**
	 * Verifica nos acessos que usarem jwt.
	 */
	const token = req.headers.access_token;

	if (!token || token.length <= 10) {
		return res.status(401).json(Result.auth(false,"Sem token vinculado, favor fazer login."));
	}

	jwt.verify(token, process.env.SECRET, function (err) {
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
