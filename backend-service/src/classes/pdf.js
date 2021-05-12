const Path = require("path");
const Model = require("../models/Pdf");
const Puppeteer = require("puppeteer");
const report = require('puppeteer-report');

module.exports = class PDF {

	constructor(viewUrl, fileName, query = {}, userID = null, type) {
		this.ViewUrl = viewUrl;
		this.FileName = fileName;
		this.query = query;
		this.userID = userID;
		this.typePDF = type;
		this.linkRelativo = Path.join(
			__dirname,
			"..",
			"..",
			"tmp",
			"uploads",
			`${this.FileName}.pdf`
		);
		this.linkAbsoluto = `${process.env.URL_SERVICE}/tmp/uploads/${this.FileName}.pdf`;
	}

	async create() {
		const browser = await Puppeteer.launch({
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--allow-http-background-page", //Permite URL não https para background_page para aplicativos hospedados.
			],
			ignoreDefaultArgs: ["--disable-extensions"],
			headless: true,
			// slowMo: 2500,
			// devtools: true,
		});

		try {

			const webPage = await browser.newPage();

			await webPage.setExtraHTTPHeaders({
				authorization: `Bearer ${process.env.SECRET}`,
			});


			return await webPage
				.goto(this.ViewUrl, {
					waitUntil: ["domcontentloaded", "networkidle0"],
				})
				.then(async () => {
					await report.pdfPage(webPage, {
						path: this.linkRelativo,
						printBackground: true,
						"-webkit-print-color-adjust": "exact",
						displayHeaderFooter: true,
						format: "A4",
						margin: {
							top: "10px",
							bottom: "10px",
						},
					});
					await this.Log("success");
					return {
						success: true,
						path: this.linkRelativo,
						link: this.linkAbsoluto,
					};

				})
				.catch((err) => {
					console.log(err);
					throw new Error("Erro em gerar PDF.");
				});
		} catch (error) {
			console.log(error)
			await this.Log("error", error.message ? error.message : error);
			return {
				success: false,
				error: error.message ? error.message : error,
			};
		} finally {
			await browser.close();
		}
	}

	async Log(status, error = null) {
		const Dados = {
			status,
			error,
			dados: JSON.stringify({
				query: typeof this.query === 'object' ? { ...this.query } : this.query,
				filename: this.FileName,
				link: this.linkAbsoluto,
			}),
			path: this.linkRelativo,
			user_id: this.userID,
			type: this.typePDF
		};
		await Model.RegisterLog(Dados);
	}

};

