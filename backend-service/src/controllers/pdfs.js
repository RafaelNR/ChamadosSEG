const View = require("../views/pdfs.view");

const LiberacaoTotal = async (req, res, next) => {
		try {
      if (!req.query && req.query.ip) throw "Dados não informado.";

			const Dados = req.query;
			return res.send(await View.render("LiberacaoTotal", Dados));
		} catch (error) {
			next(error);
		}
};

const LiberacaoSiteApp = async (req, res, next) => {
	try {
		if (!req.query && req.query.ip) throw "Dados não informado.";

		const Dados = req.query;
		return res.send(await View.render("LiberacaoSiteApp", Dados));
	} catch (error) {
		next(error);
	}
};

module.exports = {
	LiberacaoTotal,
	LiberacaoSiteApp,
};