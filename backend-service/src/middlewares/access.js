"use strict";

class Access {

	Purchase(req, res, next) {
		
		const Token = req.headers.authorization;
		
		console.log(Token)

		if (Token === `Bearer ${process.env.SECRET}`) {
			next();
		} else {
			const error = new Error("Sem permissão de acesso.");
			next(error);
		}
	}
}


module.exports = new Access();

