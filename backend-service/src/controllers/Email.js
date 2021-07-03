const Email = require("../classes/email");
// const Model = require("../models/Emails");
const { findOneByHash, emailSendAt } = require("../models/RecuperarSenha");
const ModelChamados = require("../models/Chamados");

const EnviarEmail = async (configs, Dados) => {
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

		const email = new Email("SEG - Atividades Técnicos");

		email.to = DadosEmail.to;
		email.subject = DadosEmail.subject;
		email.filename = DadosEmail.filename;
		email.file = DadosEmail.file;
		email.type = DadosEmail.type;
		email.dados = DadosEmail.dados;
		email.bcc = process.env.EMAIL_BBC;

		const resp = await email.resend(DadosEmail.id);

		console.log(resp);

		return res.json({
			success: true,
			message: "Email enviado com sucesso.",
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const ChamadoCreate = async (req, res, next) => {
	try {
		if (!req.params.id) throw "ID do chamado não encontrado.";

		const Chamado = await ModelChamados.findOne(req.params.id);

		if (!Chamado) throw new Error("Chamado não encontrada.");

		// Dados EMAIL
		const email = new Email("SEG - Chamado Aberto");
		email.subject = `Chamado Aberto C-${Chamado.id} - ${Chamado.cliente} - ${Chamado.sub_categoria}`
		email.to = `${Chamado.requerente_email}, ${Chamado.atribuido_email}`;
		email.type = "Chamado Criado";
		email.dados = Chamado;
		
		const resp = await email.send();

		if (resp.sucesso) {
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


module.exports = {
	RecuperarSenha,
	ReenviaAtividades,
	ChamadoCreate
};
