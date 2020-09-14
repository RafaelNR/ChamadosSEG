const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;

module.exports = (req, res) => {
	/**
	 * Verifica nos acessos que usarem jwt.
	 */
	const token = req.headers.access_token;

	if (!token) {
		return res.status(200).json({
			success: false,
			auth: false,
			token: null,
			message: "Precisa efetuar o login para acessar a página.",
		});
	}

	jwt.verify(token, config.SECRET, function (err) {
		if (err) {
			return res.status(200).json({
				success: false,
				auth: false,
				token: null,
				message: "Autenticação expirou ou não é mais valida.",
			});
		} else {
			return res.status(200).json({
				success: true,
				auth: true,
			});
		}
	});
};
