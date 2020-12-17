class View{

  constructor() {
    this.ejs = require('ejs');
  }

  async render(ticket, Atividade) {

    try {
      return await this.ejs.renderFile('./src/templates/Atividade.ejs', { ticket, Atividade });
    } catch (error) {
      throw new Error(error)
    }

  }

}


module.exports = new View();