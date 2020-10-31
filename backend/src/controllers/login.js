const jwt = require("jsonwebtoken");
const config = require("dotenv").config().parsed;

const Model = require("../models/login"); /* Model */
const Validation = require("../tools/validation/schemas"); /* Validation */
const { Compare } = require("../tools/bcryp");
const Result =  require('../tools/result');


module.exports = async (req, res) => {

	try {

		// Acessando a página e tem token verifica sé é valido
		const token = req.headers.access_token;

		// tem token no header do login
		if (token && token !== "undefined" && token !== "null") {
			jwt.verify(token, config.SECRET, function (err, decoded) {
				if (err) {
					return res.status(401).json(Result.auth(false,"Autenticação expirou ou não é mais valida."));
				} else {
					req.userId = Validation.ID(decoded.id);
					return res.status(200).json({ auth: true, id: req.userId });
				}
			});
		}

		// Acesso sem token usuário e senha
		const { user, passwd } = req.body;

		// Valida User
		const bodyUser = Validation.login({ user, passwd });

		// Dados do Banco
		const dbUser = await Model.getUserlogin(bodyUser.user);

		// Se Senha inválida.
		if (!dbUser || 
			!bodyUser.user !== dbUser.user &&
			!Compare(bodyUser.passwd, dbUser.passwd)) 
			throw "Usuário ou Senha são inválidos.";

		const newToken = jwt.sign({ id: dbUser.id /* Playload */ }, config.SECRET, {
			//expiresIn: process.env.NODE_ENV === 'dev' ? null : 300,
			// expiresIn: 60,
		});

		Result.ok(200,{
			auth: true,
			token: newToken,
			user: {
				id: req.userId ? req.userId : dbUser.id,
				user: dbUser.user,
				nome: dbUser.nome,
			},
		});
	} catch (error) {

		Result.fail(400, error);

	}

	return res.status(Result.status).json(Result.res);
};
