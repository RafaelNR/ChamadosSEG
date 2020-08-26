const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;

module.exports = {
	verifyJWT: (req, res, next) => {
		/**
		 * Verifica o token em todas as páginas, menos a de login;
		 */
		if (req.url !== "/login") {
			const token = req.headers.access_token;

			if (!token) {
				return res.status(401).json({
					success: false,
					auth: false,
					token: null,
					message: "Precisa efetuar o login para acessar a página.",
				});
			}

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
		}

		next();
	},
};
