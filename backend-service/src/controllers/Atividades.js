const { handleDataInfo, dateFormat, getNomeMes } = require('../utils/handleData');
const PDF = require('html-pdf');
const Model = require("../models/Atividades");
const Clientes = require("../models/Clientes");
const Tecnicos = require("../models/Tecnicos");
const View = require("../views/Atividades.pdf.view");
const Path = require("path");
const LogPdf = require("../classes/logs_pdf");

class Atividades {

	constructor() {
		this.DataInicial = null;
		this.DataFinal = null;
		this.Tecnico = null;
		this.Cliente = null;
		this.Mes = null;
		this.Ano = null;
		this.TypeView = null;
		this.FileName = null;
		this.linkRelativo = null;
		this.linkAbsoluto = null;
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
			},
		};
	}

	async createPDF(req, res) {
		try {
			this.userId = req.query.user_id;
			this.handleErrors(req.query);
			
			let Dados = await this.handleDados();

			if (!Dados || Dados.Infos.length <= 0) throw new Error("Sem informações de atividades.");

			Dados.Infos = handleDataInfo(Dados.Infos);

			const view = new View(this.TypeView, {
				...Dados,
				data_inicial: dateFormat(this.DataInicial),
				data_final: dateFormat(this.DataFinal),
				mes: getNomeMes(this.Mes).toUpperCase(),
				ano: this.Ano,
			});

			this.path = Path.join(
				__dirname,
				"..",
				"..",
				"tmp",
				"uploads",
				`${this.FileName}.pdf`
			);

			PDF.create(
				await view.render(),
				this.config
			).toFile(
				this.path,
				(err, file) => {
					if (err) {
						console.log(err)
						throw new Error(err)
					}

					console.log(file)

					this.linkRelativo = `/tmp/uploads/${this.FileName}.pdf`;
					this.linkAbsoluto = `${process.env.URL_SERVICE}/tmp/uploads/${this.FileName}.pdf`;

					this.Log('success')
					this.clear();
					return res.status(200).json({
						success: true,
						path: this.linkRelativo,
						link: this.linkAbsoluto
					});
				}

			);
		} catch (error) {
			this.Log("error", error.message ? error.message : error);
			return res.status(404).send(error.message ? error.message : error);
		}
	}

	async handleDados() {

		const Infos = await Model.getDados({
			data_inicial: this.DataInicial,
			data_final: this.DataFinal,
			periodo: {
				mes: this.Mes,
				ano: this.Ano,
			},
			tecnico: this.Tecnico,
			cliente_id: this.Cliente,
		});


		if (this.DataInicial && this.DataFinal && this.Tecnico) {
			this.TypeView = 'DataTécnico';
			this.FileName = `${this.DataInicial}-${this.DataFinal}-${this.Tecnico}`;

			return {
				Infos,
				Tecnico: await Tecnicos.getTecnico(this.Tecnico),
				Clientes: await Clientes.getClientesByTecnico(this.Tecnico),
			}

			
		} else if (this.DataInicial && this.DataFinal && this.Cliente) {
			this.TypeView = "DataCliente";
			this.FileName = `${this.DataInicial}-${this.DataFinal}-${this.Cliente}`;
			return {
				Infos,
				Cliente: await Clientes.getCliente(this.Cliente),
				Tecnicos: await Tecnicos.getTecnicosByCliente(this.Cliente),
			};
			
		} else if (this.Mes && this.Ano && this.Tecnico) {
			this.TypeView = "PeríodoTécnico";
			this.FileName = `${this.Mes}-${this.Ano}-${this.Tecnico}`;
			return {
				Infos,
				Tecnico: await Tecnicos.getTecnico(this.Tecnico),
				Clientes: await Clientes.getClientesByTecnico(this.Tecnico),
			};
			
		} else if (this.Mes && this.Ano && this.Cliente) {
			this.TypeView = "PeríodoCliente";
			this.FileName = `${this.Mes}-${this.Ano}-${this.Cliente}`;
			return {
				Infos,
				Cliente: await Clientes.getCliente(this.Cliente),
				Tecnicos: await Tecnicos.getTecnicosByCliente(this.Cliente),
			};
			
		} else {
			throw new Error('Informações inválidas.')
		}

	}

	handleErrors(Query) {
		console.log(Query)
		this.DataInicial = Query.data_inicial;
		this.DataFinal = Query.data_final;
		this.Mes = Query.mes;
		this.Ano = Query.ano;
		this.Tecnico = Query.tecnico
		this.Cliente = Query.cliente

		if ((Boolean(this.DataFinal) || Boolean(this.DataInicial)) && (Boolean(this.Mes) || Boolean(this.Ano))) {
			throw new Error("Valores de data ou período estão duplicados.");
		}
		
		if ((!this.DataInicial || !this.DataFinal) && (!this.Mes || !this.Ano)) {
			// console.log(Boolean(this.DataFinal), Boolean(this.DataInicial), Boolean(this.Mes), Boolean(this.Ano))
			throw new Error("Data os períodos são inválidos");
		}

		if (!this.Tecnico && !this.Cliente)
			throw new Error("Parametros da pesquisa inválidos");


	}

	Log(status, error = null) {
    const Dados = {
      status,
      error,
			dados: JSON.stringify({
				inicial: this.DataInicial,
				final: this.DataFinal,
				mes: this.Mes,
				Ano: this.Ano,
				tecnico: this.Tecnico,
				cliente: this.Cliente,
			}),
      path: this.linkRelativo,
      user_id: this.userId,
    }
    LogPdf.Register(Dados);
	}

	clear() {
		this.DataInicial = null;
		this.DataFinal = null;
		this.Tecnico = null;
		this.Cliente = null;
		this.Mes = null;
		this.Ano = null;
		this.TypeView = null;
		this.FileName = null;
	}
}

module.exports = new Atividades();
