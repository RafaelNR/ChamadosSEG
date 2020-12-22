const ejs = require("ejs");

class View {
	constructor(type, dados) {
		this.ejs = ejs;
		this.Type = type;
		this.Dados = dados;
		this.Template = this.getTemplate();
	}

	async render() {
		try {
			return await this.ejs.renderFile(`./src/templates/${this.Template}.ejs`, {
				Dados: this.Dados,
			});
		} catch (error) {
			throw new Error(error);
		}
	}

	getTemplate() {

		switch (this.Type) {
			case "DataTécnico":
				return "AtividadesDataTecnico";

			case "DataCliente":
				return "AtividadesDataCliente";

			case "PeríodoTécnico":
				return "AtividadesPeriodoTecnico";

			case "PeríodoCliente":
				return "AtividadesPeriodoCliente";

			default:
				return null;
		}


	}


}

module.exports = View;
