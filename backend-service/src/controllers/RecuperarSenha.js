const Email = require("../classes/email");
const Model = require('../models/RecuperarSenha');


const EnviarEmail = async (Dados) => {
  const email = new Email('Redefinir senha');
  email.to = Dados.email;
  email.subject = "Recuperação de senha - OS Técnicos";
  email.type = "Redefinição de Senha";
  email.dados = Dados;

  return await email.send();
}



module.exports = async (req, res, next) => {
  
  try {
    if (!req.query.hash) throw ('Hash não foi enviada. Por favor tente mais tarde.')
        
    const Dados = await Model.findOneByHash(req.query.hash);

    if (!Dados) throw new Error('Hash não encontrada.');

    const resp = await EnviarEmail(Dados);

    if (resp.sucesso) {
      await Model.emailSendAt(Dados.id);
      return res.send({
        success: true,
        message: 'Email envido com sucesso.'
      });
    } else {
      next("Erro em enviar email.");
    }
    
  } catch (error) {
    console.log(error);
    next(error);
  }



}
