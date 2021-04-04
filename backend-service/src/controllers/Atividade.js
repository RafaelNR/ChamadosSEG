const moment = require('moment');
class Atividade {
  
  constructor() {
    this.Model = require("../models/Atividade");
    this.View = require("../views/Atividade.pdf.view");
		this.ticket = null;
    this.Atividade = null;
  }
  
  async handleAtividade() {

    const Atividade = await this.Model.findByTicket(this.ticket);

    if (!Atividade || Atividade.length <= 0)
      throw "Atividade não existe";
    
    
    return {
      new_date: moment(Atividade.date).locale('pt-br').format("DD/MM/YYYY"),
      new_created_at: moment(Atividade.created_at).locale('pt-br').format('DD/MM/YYYY HH:mm'),
      new_updated_at: moment(Atividade.updated_at).locale('pt-br').format('DD/MM/YYYY HH:mm'),
      ...Atividade
    }

  }

  async render(req, res, next) {
    try {
			if (!req.params.ticket) throw "Ticket não informado.";
      this.ticket = req.params.ticket;
      
      this.Atividade = await this.handleAtividade();


      return res.send(await this.View.render(this.ticket, this.Atividade));

    } catch (error) {
			next(error);
		}
	}

}

module.exports = new Atividade();