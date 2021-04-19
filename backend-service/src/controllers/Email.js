const Email = require('../classes/email')


const Enviar = async (req,res,next) => {


  try {

    const email = new Email();

    if (req.method === 'GET') {
			email.to = "no-replay@seg.eti.br <Recuperação de senha>";
			email.subject = "Recuperação de senha - OS Técnicos";
			email.type = "Redefinição de Senha";
			email.dados = {
				token: "fkshfkjdshjfkhdsjkfhsdjkfs",
			};
		} else {
      if (!req.body) throw new Error('Valores inválidos.')
        
      const { to, subject, filename, file, type, dados } = req.body;
      email.to = to
      email.subject = subject
      email.filename = filename
      email.file = file
      email.type = type
      email.dados = dados
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
