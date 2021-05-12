const PDF = require('../classes/pdf')

class Atividades {

  async createPDF(req, res, next) {
    
		try {
			if (!req._parsedUrl.search) throw "Parâmetros não informado.";
			if (!req.query.user_id) throw "Usuário não enviado.";

			const query = req._parsedUrl.search;
			const userId = req.query.user_id;
			const FileName = this.getFileName(req.query);
			const Url = `${process.env.URL_SERVICE}/atividades${query}`;

			console.log('View Page URL >>', Url)
			
			const pdf = new PDF(
				Url,
				FileName,
				query,
				userId,
				this.getTypePDf(req.query)
			);

			const Dados = await pdf.create();

			if (Dados.success) {
				return res.status(200).json(Dados);
			}

			throw Dados;

		} catch (error) {
			next(error);
		}
	}

  getFileName(query) {
    const values = Object.values(query);
    return values.join('-');
	}
	
	getTypePDf(query) {

		if (query.mes && query.cliente)
			return "Atividades Mensal Cliente";
		else if (query.mes && query.tecnico)
			return "Atividades Mensal Técnico";
		else if (query.data_inicial && query.cliente)
			return "Atividades Período Cliente";
		else if (query.data_inicial && query.tecnico)
			return "Atividades Período Técnico";
		else
			return "Atividades";
			
	}

}

module.exports = new Atividades();
