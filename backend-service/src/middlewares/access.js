"use strict";

class Access {

	Purchase(req, res, next) {

    const currToken = "rafael@access";
    const Token = "rafael@access"; // req.headers.token

		if (Token === currToken) {
			next();
		} else {
			const error = new Error("Sem permissão de acesso.");
			next(error);
		}
	}
}


module.exports = new Access();

