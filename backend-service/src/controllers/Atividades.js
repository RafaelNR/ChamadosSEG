class Atividades {
	constructor() {
		this.ticket = "";
		this.Atividade = "";
	}

	createPDF(req, res) {
		res.send("teste");
	}

	submitEmailWithPDF(req, res) {
		res.send("teste");
	}

	registerPDFCreated() {
		//TODO REGISTRA NO BANCO SE O PDF FOI CRIADO COM SUCESSO OU ERRO
	}

	registerEmailSent() {
		//TODO REGISTRA NO BANCO SE O ENVIO FOI ENVIADO COM SUCESSO OU ERRO
	}
}

module.exports = new Atividades();
