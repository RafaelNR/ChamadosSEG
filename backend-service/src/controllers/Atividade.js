const moment = require('moment');
const Path = require("path");
const LogPdf =  require('../classes/logs_pdf')
class Atividade {
  
  constructor() {
    this.pdf = require("html-pdf");
    this.Model = require("../models/Atividade");
    this.View = require("../views/Atividade.pdf.view");
		this.ticket = null;
    this.Atividade = null;
    this.linkRelativo = null;
    this.config = {
			format: "A4",
			header: {
				height: "30mm",
			},
      footer: {
        height: "30mm",
      }
		};
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

  async createPDF(req, res, next) {
    try {
			if (!req.params.ticket) throw "Ticket não informado.";
      this.ticket = req.params.ticket;
      this.userId = req.query.user_id;
      
      this.Atividade = await this.handleAtividade();


      this.path = Path.join(
				__dirname,
				"..",
				"..",
				"tmp",
				"uploads",
				`${this.ticket}.pdf`
      );
      
      //Cria o PDF  
      this.pdf.create(await this.View.render(this.ticket,this.Atividade),this.config).toFile(this.path, (err, file) => {

        if (err) throw new Error('Erro em criar o PDF.');

        console.log(file);

        this.linkRelativo = `/tmp/uploads/${this.ticket}.pdf`;
				this.linkAbsoluto = `${process.env.URL_SERVICE}/tmp/uploads/${this.ticket}.pdf`;

        this.Log('success');
        return res.status(200).json({
          success: true,
          path: this.linkRelativo,
          link: this.linkAbsoluto,
        })
        
      })

      
    } catch (error) {
      this.Log('error',error)
			next(error);
		}
	}

	Log(status, error=null){
    const Dados = {
      status,
      error,
      dados: this.ticket,
      path: this.linkRelativo,
      user_id: this.userId,
    }
    LogPdf.Register(Dados);
	}

}

module.exports = new Atividade();