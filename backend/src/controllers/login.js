const jwt = require("jsonwebtoken");
const Model = require("../models/login");
const User = require("../models/user");
const Validation = require("../tools/validation/schemas");
const { Compare } = require("../tools/bcryp");
const Result =  require('../tools/result');


module.exports = async (req, res) => {

	try {

		// Acessando a página e tem token verifica sé é valido
		const token = req.headers.access_token;

		// tem token no header do login
		if (token && token !== "undefined" && token !== "null") {
			jwt.verify(token, process.env.SECRET, async function (err, decoded) {
				if (err) {
					return res.status(401).json(Result.auth(false,"Autenticação expirou ou não é mais valida."));
				} else {
					req.userId = Validation.ID(decoded.id);
					return res.status(200).json({ success: true, data: { auth: true, user: await Model.getDataAfterLogin(req.userId) }});
				}
			});
		}

		// Acesso sem token usuário e senha
		const { user, passwd, permanecer } = req.body;

		// Valida User
		const bodyUser = Validation.login({ user, passwd });

		// Dados do Banco
		const dbUser = await Model.login(bodyUser.user);
			
		if (
				!dbUser ||
				(!bodyUser.user !== dbUser.user &&
					!Compare(bodyUser.passwd, dbUser.passwd))
			)
				throw "Usuário ou Senha são inválidos.";

		if (!dbUser.actived || dbUser.actived === 0)
			throw "Usuário sem permissão de login.";

		const newToken = jwt.sign(
			{ id: dbUser.id /* Playload */ },
			process.env.SECRET,
			{
				//expiresIn: process.env.NODE_ENV === 'dev' ? 3600 : 10800,
				//expiresIn: permanecer ? 30 : 30,
				expiresIn: permanecer ? 3600*24*30 : 3600*8,
			}
		);

		Result.ok(200, {
			auth: true,
			token: newToken,
			user: await User.findOne(req.userId ? req.userId : dbUser.id),
		});
	} catch (error) {
		console.log(error)
		Result.fail(400, error);

	}

	return res.status(Result.status).json(Result.res);
};
