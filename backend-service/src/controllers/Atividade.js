const moment = require('moment');
class Atividade {
  
  constructor() {
    this.pdf = require("html-pdf");
    this.Model = require("../models/Atividade");
    this.View = require("../views/Atividade.pdf.view");
		this.ticket = "";
    this.Atividade = "";
    this.filename = "";
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
    
    
    const imagem = Atividade.cliente.nome_fantasia.split('/')[0].toLowerCase();
    
    return {
      new_date: moment(Atividade.date).locale('pt-br').format("DD/MM/YYYY"),
      new_created_at: moment(Atividade.created_at).locale('pt-br').format('DD/MM/YYYY HH:mm'),
      new_updated_at: moment(Atividade.updated_at).locale('pt-br').format('DD/MM/YYYY HH:mm'),
      imagem: `http://localhost:3001/static/${imagem}.png`,
      ...Atividade
    }

  }

  async createPDF(req, res, next) {
    try {
      
			if (!req.params.ticket) throw "Ticket não informado.";
      this.ticket = req.params.ticket;
      
      this.Atividade = await this.handleAtividade();

      //Cria o PDF
      this.pdf.create(await this.View.render(this.ticket,this.Atividade),this.config).toFile(`./tmp/uploads/${this.ticket}.pdf`, (err, file) => {

        if (err) return { success: false, error: err }

        this.filename = file.filename;

        return res.status(200).json({
          success: true,
          path: `/tmp/${this.ticket}.pdf`,
          link: `${process.env.URL_SERVICE}/tmp/uploads/${this.ticket}.pdf`
        })
        
      })

      
    } catch (error) {
			next(error);
		}
	}

	submitEmailWithPDF(req, res) {
		res.send(this.ticket);
  }

	registerPDFCreated() {
		//TODO REGISTRA NO BANCO SE O PDF FOI CRIADO COM SUCESSO OU ERRO
	}

	registerEmailSent() {
		//TODO REGISTRA NO BANCO SE O ENVIO FOI ENVIADO COM SUCESSO OU ERRO
  }
  
}

module.exports = new Atividade();