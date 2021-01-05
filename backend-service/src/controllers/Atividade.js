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
			border: {
				// top: "20px",
				// right: "20px",
				// bottom: "20px",
				// left: "20px",
			},
			header: {
				height: "30mm",
			},
      footer: {
        height: "30mm",
      }
		};
	}

  async createPDF(req, res, next) {
    try {
      
      this.ticket = req.params.ticket;
			if (!this.ticket) throw new Error("Ticket não existe");
      
      this.Atividade = await this.Model.findByTicket(this.ticket);
      
      if (!this.Atividade || this.Atividade.length <= 0) throw new Error('Atividade não existe');

      // Cria o PDF
      this.pdf.create(await this.View.render(this.ticket,this.Atividade),this.config).toFile(`./tmp/uploads/${this.ticket}.pdf`, (err, file) => {

        if (err) return { success: false, error: err }

        this.filename = file.filename;

        return res.status(200).json({
          success: true,
          path: `/tmp/${this.ticket}.pdf`,
          link: `${process.env.URL_SERVICE}/tmp/uploads/${this.ticket}.pdf`
        })

        // res.type('pdf')
        // return res.sendFile(`${process.cwd()}/tmp/${this.ticket}.pdf`)
        
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