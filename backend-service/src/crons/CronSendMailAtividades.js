const Cron = require('cron').CronJob
const moment = require('moment');
const Email = require('../classes/email')
const PDF = require('../classes/pdf');
const { getClientes } = require('../models/Clientes')
const { getTecnicosByCliente } = require('../models/Tecnicos');

// Aumentado o limite de event de 10, padrão, para 20;
require("events").EventEmitter.prototype._maxListeners = 20;

class CronSendMailAtividades {
	constructor() {
		this.config = {
			cronTime: '0 0 1 1 * *',
			//cronTime: "0 40 16 3 * *",
			start: true,
			onTick: () => {
				this.onTick();
			},
			onComplete: null,
			timeZone: "America/Sao_Paulo",
			runOnInit: false,
		};
		this.currMes = moment(moment().subtract(1, "month")).format("M");
		this.currAno = moment().year();
		this.nameMes = moment(this.currMes).format("MMMM");
	}

	start() {
		this.Job = new Cron({ ...this.config });
		if (this.Job.running) {
			console.log(
				"->> CRON - SendMailAtividades - Tarefa agendada corretamente."
			);
			console.log(
				"->> CRON - SendMailAtividades - Próxima execução: ",
				this.Job.nextDate().format("DD/MM/YY HH:mm:ss")
			);
		} else {
			console.log("->> CRON - Erro em agendar tarefas.");
		}
	}

	async onTick() {
		const d = new Date();
		console.log("Init First:", d);

		try {
			const Clientes = await getClientes();

			Clientes.map(async (Cliente) => {

				const Tecnicos = await getTecnicosByCliente(Cliente.id);
				const filename = await this.createdPdf(
					this.currMes,
					this.currAno,
					Cliente.id
				);

				if (!filename.message) {
					this.sendEmail(
						Cliente.email,
						Cliente.nome_fantasia,
						filename,
						{
							data_ano: `${this.nameMes}/${this.currAno}`,
							tecnicos: Tecnicos,
						}
					);
					console.log("Email Enviado!");
				}


			});
		} catch (error) {
			console.log('ERROR: ',error);
		}
	}

	onComplete() {
		console.log("JOB Complete.");
		this.Job.stop();
	}

	sendEmail(clienteEmail, clienteName, filename, dados) {
		const email = new Email("SEG - Atividades Técnicos");

		email.to = clienteEmail;
		email.subject = `Relatório Mensal de Atividade - ${clienteName}`;
		email.filename = `Relatório Mensal de Atividade - ${clienteName}`;
		email.file = filename;
		email.type = "Relatório Mensal de Atividades";
		email.dados = dados;

		email
			.send()
			.then((resp) => {
				console.log(resp);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				console.log(
					"->> CRON - NextDates:",
					this.Job.nextDates().format("DD/MM/YY HH:mm:ss")
				);
			});
	}

	async createdPdf(mes, ano, clienteID) {
    const query = { mes: mes, ano:ano, cliente: clienteID };
    const FileName = this.getFileName(query);
    const Url = `${process.env.URL_SERVICE}/atividades?ano=${ano}&mes=${mes}&cliente=${clienteID}`;

    const pdf = new PDF(Url, FileName, query);

    const Dados = await pdf.create();

    if (Dados.success) {
			console.log(`PDF criado: ${FileName}`)
			return FileName;
    }

    throw Dados;
	}

	getFileName(query) {
		const values = Object.values(query);
		return values.join("-");
	}
}


module.exports = new CronSendMailAtividades;