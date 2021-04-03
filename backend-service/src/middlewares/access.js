"use strict";

class Access {

	Purchase(req, res, next) {


		const Token = req.headers.authorization;


		if (
			Token === `Bearer ${process.env.SECRET}` ||
			"/templates/pdf/teste" === req.url
		) {
			next();
		} else {
			const error = new Error("Sem permissão de acesso.");
			next(error);
		}
	}
}


module.exports = new Access();

