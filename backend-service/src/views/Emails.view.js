class View {
	constructor() {
    this.ejs = require("ejs");
    this.path = "./src/templates/emails/"
	}

	render(type, Dados=null) {
    this.type = type;
    this.Dados = Dados
    return this.ejs.renderFile(this.getTemplate(), {
      ...this.Dados
    });
  }

  getTemplate() {
    switch (this.type) {
			case "Relatório Mensal de Atividades":
				if (!this.Dados || !this.Dados.tecnicos)
					throw new Error("Dados não informados.");
				return `${this.path}atividades-mensal.ejs`;

			case "Redefinição de Senha":
				if (!this.Dados || !this.Dados.hash)
					throw new Error("Dados não informados.");
				return `${this.path}redefinir-senha.ejs`;

			case "Chamado Criado":
				if (!this.Dados || !this.Dados.id)
					throw new Error("Dados não informados.");
				return `${this.path}chamado-create.ejs`;

			default:
				throw new Error("Template de email invalido.");
		}


  }
  
}


module.exports = new View();