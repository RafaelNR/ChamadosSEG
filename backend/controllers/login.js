const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;

const Model = require("../models/login"); /* Model */
const Validation = require("../tools/validation/schemas"); /* Validation */
const Log = require("./log"); /* Log */
const { Compare } = require("../tools/bcryp");

let response;
let status = 200;

module.exports = {
	login: async (req, res) => {
		// Acessando a página e tem token verifica sé é valido
		const token = req.headers.access_token;

		// tem token no header do login
		if (token) {
			jwt.verify(token, config.SECRET, function (err, decoded) {
				req.userId = Validation.ID(decoded.id);

				if (err) {
					status = 401;
					response = {
						success: false,
						auth: false,
						token: null,
						message: "Autenticação expirou.",
					};
				} else {
					response = { auth: true };
				}
			});

			Log.Save(req.userId, "login", "auth", response);
			return res.status(status).json(response);
		}

		try {
			// Acesso sem token usuário e senha
			const { user, passwd } = req.body;

			// Valida User
			const bodyUser = Validation.login({ user, passwd });

			// Dados do Banco
			const dbUser = await Model.getUserlogin(bodyUser.user);

			if (
				!bodyUser.user !== dbUser.user &&
				!Compare(bodyUser.passwd, dbUser.passwd)
			)
				throw "Dados inválidos.";

			const token = jwt.sign({ id: dbUser.id /* Playload */ }, config.SECRET, {
				//expiresIn: process.env.NODE_ENV === 'dev' ? null : 300,
			});

			response = {
				success: true,
				auth: true,
				token,
				user: {
					id: req.userId ? req.userId : dbUser.id,
					user: dbUser.user,
					nome: dbUser.nome,
				},
			};
		} catch (error) {
			status = 401;
			response = {
				success: false,
				auth: false,
				error,
			};
		}

		return res.status(status).json(response);
	},
};
