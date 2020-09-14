const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;

const Model = require("../models/login"); /* Model */
const Validation = require("../tools/validation/schemas"); /* Validation */
const { Compare } = require("../tools/bcryp");

let response;
let status = 200;

module.exports = async (req, res) => {
	// Acessando a página e tem token verifica sé é valido
	const token = req.headers.access_token;

	// tem token no header do login
	if (token && token !== "undefined" && token !== "null") {
		jwt.verify(token, config.SECRET, function (err, decoded) {
			if (err) {
				status = 200;
				response = {
					success: false,
					auth: false,
					token: null,
					message: "Autenticação expirou.",
				};
			} else {
				req.userId = Validation.ID(decoded.id);
				status = 200;
				response = { auth: true };
			}
		});
		return res.status(status).json(response);
	}

	try {
		// Acesso sem token usuário e senha
		const { user, passwd } = req.body;

		// Valida User
		const bodyUser = Validation.login({ user, passwd });

		// Dados do Banco
		const dbUser = await Model.getUserlogin(bodyUser.user);

		if (!dbUser) throw "Dados Inválidos";

		if (
			!bodyUser.user !== dbUser.user &&
			!Compare(bodyUser.passwd, dbUser.passwd)
		)
			throw "Dados inválidos.";

		const token = jwt.sign({ id: dbUser.id /* Playload */ }, config.SECRET, {
			//expiresIn: process.env.NODE_ENV === 'dev' ? null : 300,
			// expiresIn: 60,
		});

		status = 200;
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
		status = 200;
		response = {
			success: false,
			auth: false,
			error,
		};
	}

	return res.status(status).json(response);
};
