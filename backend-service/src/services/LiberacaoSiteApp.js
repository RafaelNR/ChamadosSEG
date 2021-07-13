const PDF = require("../classes/pdf");
const moment = require("moment");

const createPDF = async (req, res, next) => {
	try {
		if (!req.body && !req.body.ip) throw "Dados não enviado.";
		if (!req.body.user_id) throw "Usuário não enviado.";

		console.log(req.body)

		const query = convertObjetoInQueryString(req.body);
		const userId = req.body.user_id;
		const name = FileName(req.body.ip);

		const Url = `${process.env.URL_SERVICE}/pdf/liberacaositeapp?${query}`;

		const pdf = new PDF(Url, name, query, userId, "Liberação Total");

		const Dados = await pdf.create();

		if (Dados.success) {
			return res.status(200).json(Dados);
		}

		throw Dados;
	} catch (error) {
		next(error);
	}
};

const convertObjetoInQueryString = (objeto) => {
	const query = [];
	for (var p in objeto)
		query.push(encodeURIComponent(p) + "=" + encodeURIComponent(objeto[p]));

	return query.join("&");
};

const FileName = (IP) => {
	const newIP = IP.replace(/\.+/g, "");
	const data = moment().unix().toString();
	return `liberacao_siteapp_${newIP}_${data}`;
};

module.exports = {
	createPDF,
};
