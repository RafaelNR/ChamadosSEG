class View {
	constructor() {
		this.ejs = require("ejs");
		this.path = "./src/templates/pdfs/";
	}

	render(type, Dados = null) {
		this.type = type;
		this.Dados = Dados;
		return this.ejs.renderFile(this.getTemplate(), {
			...this.Dados,
		});
	}

  getTemplate() {
    const types = ["LiberacaoTotal", "LiberacaoSiteApp"];
    if (types.includes(this.type))
      return this.path + this.type + '.ejs';
    
    return '';
	}
}

module.exports = new View();
