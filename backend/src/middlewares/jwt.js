const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	/**
	 * Verifica nos acessos que usarem jwt.
	 */
	const token = req.headers.access_token;
	
	if (!token) {
		return res.status(401).json({
			success: false,
			auth: false,
			token: null,
			message: "Sem Autenticação ou Autorização.",
		});
	} else {

		jwt.verify(token, process.env.SECRET, function (err, decoded) {
			// Libera o acesso
			if (decoded && decoded.id) {
				req.userId = decoded.id;
			} 
		});

	}

	if (req.userId) {
		next();
	} else {
		return res.status(401).json({
				success: false,
				auth: false,
				token: null,
				message: "Autenticação expirou."
		});
	}

		
};
