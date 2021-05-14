const nodemailer = require('nodemailer');
const Model = require('../models/Emails');
const View = require('../views/Emails.view')
const Path = require('path');
const fs = require("fs");

module.exports = class Email {
	constructor(textFrom) {
		this.message = {
			from: `${textFrom} < ${process.env.EMAIL_USER} >`, // REMETENTE
		};
		this.dados = null;
		this.email = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
	}

	async send() {
		try {
			await this.viewTemplate();
			this.handleAttachments();
			const Data = await this.email.sendMail(this.message);

			if (Data.response.includes("OK")) {
				await this.registerLog({ status: "success" });
				return {
					sucesso: true,
					message: "Email Enviado para: " + this.message.to,
				};
			} else {
				await this.registerLog({ status: "error", error: Data });
				throw error.message ? error.message : error;
			}
		} catch (error) {
			await this.registerLog({
				status: "error",
				error: error.message ? error.message : error,
			});
			throw error.message ? error.message : error;
		}
	}

	async resend(id) {
		try {
			await this.viewTemplate();
			this.handleAttachments();
			const Data = await this.email.sendMail(this.message);

			if (Data.response.includes("OK")) {
				await Model.updateResend({
					id,
					status: 'success',
					error: null,
				})
				return {
					sucesso: true,
					message: "Email Enviado para: " + this.message.to,
				};
			} else {
				await Model.updateResend({
					id,
					status: "error",
					error: Data,
				});
				throw error.message ? error.message : error;
			}
		} catch (error) {
			await Model.updateResend({
				id,
				status: "error",
				error: error.message ? error.message : error,
			});
			throw error.message ? error.message : error;
		}
	}

	async registerLog({ status, error = null }) {
		await Model.registerEmail({
			status,
			type: this.type,
			to: this.message.to,
			subject: this.message.subject,
			file: this.file,
			filename: this.filename,
			error: error ? error : null,
		});
	}

	handleAttachments() {
		if (this.file) {
			this.path = Path.join(
				__dirname,
				"..",
				"..",
				"tmp",
				"uploads",
				`${this.file}.pdf`
			);
			if (fs.existsSync(this.path)) {
				return (this.message = {
					...this.message,
					attachments: [
						{
							filename: this.filename,
							content: fs.readFileSync(this.path),
							type: "application/pdf",
							contentType: "application/pdf",
						},
					],
				});
			}

			throw "Arquivo em anexo não existe.";
		}
	}

	async viewTemplate() {
		console.log(this.dados);
		this.message.html = await View.render(this.type, this.dados);
	}

	set to(to) {
		if (!to) throw new Error("Remetente invalido.");

		this.message.to = to;
	}

	set subject(subject) {
		if (!subject) throw new Error("Assunto invalido.");

		this.message.subject = subject;
	}

	set bcc(bcc = "") {
		this.message.bcc = bcc; // copia oculta
	}

	set html(text) {
		if (!text) throw new Error("Conteúdo invalido.");

		this.message.html = text;
	}
};
