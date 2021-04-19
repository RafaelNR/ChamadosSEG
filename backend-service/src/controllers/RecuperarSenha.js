const Email = require("../classes/email");
const Model = require('../models/RecuperarSenha');



const EnviarEmail = async (Dados) => {
  const email = new Email();
  email.to = "no-replay@seg.eti.br <Recuperação de senha>";
  email.subject = "Recuperação de senha - OS Técnicos";
  email.type = "Redefinição de Senha";
  email.dados = Dados;

  return await email.send();
}



module.exports = async (req, res, next) => {
  
  try {
    if (req.params.hash) throw ('Hash não foi enviada.')
    
    const Dados = await Model.findOneByHash(req.params.hash);

    if (!Dados) throw ('Hash não encontrada.');

    const resp = await EnviarEmail(Dados);

    if (resp) {
      Model.insertSendAt(Dados.id);
      res.send("Email enviado.");
    } else {
      next("Erro em enviar email.");
    }
    
  } catch (error) {
    console.log(error);
    next(error.message ? error.message : "Erro em enviar email.");
  }



}
