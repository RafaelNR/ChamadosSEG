"use strict";

class Access {

	Purchase(req, res, next) {

		console.log(req.headers.authorization)

    const currToken = "Bearer rafael@access";
    const Token = req.headers.authorization;

		if (Token === currToken) {
			next();
		} else {
			const error = new Error("Sem permissão de acesso.");
			next(error);
		}
	}
}


module.exports = new Access();

