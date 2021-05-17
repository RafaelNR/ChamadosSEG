const Email = require("../classes/email");
const Model = require("../models/Emails");
const { findOneByHash, emailSendAt } = require("../models/RecuperarSenha");

const EnviarEmail = async (configs,Dados) => {
	const email = new Email(configs.textFrom);
	email.type = configs.type;
	email.subject = configs.subject;
	email.to = Dados.email;
	email.dados = Dados;

	return await email.send();
};

const RecuperarSenha = async (req, res, next) => {
	try {
		if (!req.query.hash)
			throw "Hash não foi enviada. Por favor tente mais tarde.";

		const Dados = await findOneByHash(req.query.hash);

    if (!Dados) throw new Error("Hash não encontrada.");
    
    const configs = {
			textFrom: "Redefinir senha",
			subject: "Recuperação de senha - OS Técnicos",
			type: "Redefinição de Senha",
		};

		const resp = await EnviarEmail(configs, Dados);

		if (resp.sucesso) {
			await emailSendAt(Dados.id);
			return res.send({
				success: true,
				message: "Email envido com sucesso.",
			});
		} else {
			next("Erro em enviar email.");
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};


const ReenviaAtividades = async (req, res, next) => {
	try {
		const DadosEmail = req.body;

		console.log(DadosEmail);

		const email = new Email("SEG - Atividades Técnicos");

		email.to = DadosEmail.to;
		email.subject = DadosEmail.subject;
		email.filename = DadosEmail.filename;
		email.file = DadosEmail.file;
		email.type = DadosEmail.type;
		email.dados = DadosEmail.dados;
		email.bcc = process.env.EMAIL_BBC;

		const resp = await email.resend(DadosEmail.id);

		console.log(resp)

		return res.json({
			success: true,
			message: "Email enviado com sucesso.",
		});

	} catch (error) {
		console.log(error);
		next(error);
	}
};

module.exports = {
	RecuperarSenha,
	ReenviaAtividades,
};
