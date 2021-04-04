"use strict";

class Access {

	Purchase(req, res, next) {

		if(process.env.NODE_ENV === 'dev'){
			return next();
		}

		const Token = req.headers.authorization;

		if (Token === `Bearer ${process.env.SECRET}`) {
			next();
		} else {
			const error = new Error("Sem permissão de acesso.");
			next(error);
		}
	}
}


module.exports = new Access();

