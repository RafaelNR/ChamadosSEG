const Email = require('../classes/email')


const Enviar = async (req,res,next) => {


  try {

    const email = new Email();

    if (req.method === 'GET') {
			email.to = "rafael.rodrigues@seg.eti.br";
			email.subject = "Relatório";
			email.filename = "Relatório de Atividade - CISDESTE";
			email.file = "41.20210209.pdf";
			email.type = "Redefinição de Senha";
			email.dados = {
				token: "fkshfkjdshjfkhdsjkfhsdjkfs",
			};
		} else {
      if (!req.body) throw new Error('Valores inválidos.')
        
      const { to, subject, filename, file, type } = req.body;
      email.to = to
      email.subject = subject
      email.filename = filename
      email.file = file
      email.type = type
    }

    const resp = await email.send()

    console.log(resp)

    if (resp) {
      res.send("Email enviado.");
    } else {
      next("Erro em enviar email.");
    }
    
  } catch (error) {
    console.log(error)
    next( error.message ? error.message : "Erro em enviar email.");
  }

}


module.exports = {
  Enviar
}

      // email.type = "Redefinição de Senha";
			// email.dados = {
			// 	token: "fkshfkjdshjfkhdsjkfhsdjkfs",
			// };

      // email.type = "Relatório Mensal de Atividades";
      // email.dados = {
      //   data_ano: 'Fevereiro/2021',
      //   tecnicos: [
      //     { nome: 'Jose Maria Silva' },
      //     { nome: 'Fulano de tal '}
      //   ]
      // }