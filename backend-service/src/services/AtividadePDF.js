const PDF = require("../classes/pdf");

class Atividade {

	async createPDF(req, res, next) {
		try {
			if (!req.params.ticket) throw "Ticket não informado.";
			if (!req.query.user_id) throw "Usuário não enviado.";

			const ticket = req.params.ticket;
			const userId = req.query.user_id;
			const Url = `${process.env.URL_SERVICE}/atividade/${ticket}`;

			const pdf = new PDF(Url, ticket, { ticket: ticket }, userId, 'Atividade');

			const Dados = await pdf.create();

			if (Dados.success) {
				return res.status(200).json(Dados);
			}

			throw Dados;
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new Atividade();
