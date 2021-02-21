const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	/**
	 * Verifica nos acessos que usarem jwt.
	 */
	const token = req.headers.access_token;

	if (!token) return res.status(401).json({
		success: false,
		message: "Sem Autenticação ou Autorização.",
	});

	jwt.verify(token, process.env.SECRET, function (err, decoded) {
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
