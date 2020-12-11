const App = require("../src/core/app");
const request = require("supertest")(App);
const moment = require("moment");

const { Token } = require("./auth.test");
let Atividade = ''

describe("Deve testar as informações da atividade sem erros.", () => {

	it("Primeiro devo criar uma atividade com a data de hoje.", async () => {
		const resp = await request
			.post("/atividades")
			.send({
				cliente_id: 1,
				date: moment(new Date()).format("YYYY-MM-DD"), // Data de hoje
			})
			.set("access_token", Token());

		Atividade = resp.body.data;
	});

	it("Deve inserir uma nova informação na atividade", async () => {
		return await request
			.post("/atividades/infos")
			.send({
				descricao: "Fiz mais uma tal coisa",
				categoria_id: 2,
				atividade_id: 2,
				ticket: Atividade.ticket,
			})
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(201);
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("descricao");
				expect(res.body.data).toHaveProperty("categoria");
				expect(res.body.data).toHaveProperty("categoria_id");
				expect(res.body.data).toHaveProperty("técnico");
				expect(res.body.data).toHaveProperty("created_at");
				expect(res.body.data).toHaveProperty("updated_at");
			})
	});

	it("Deve fazer o update da informação da atividade", async () => {
		return await request
			.put("/atividades/infos/1")
			.send({
				id: 1,
				descricao: "Fiz mais uma tal Alterada",
				categoria_id: 2,
			})
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(204);
			})
	});

});

describe("Devo recever errors", () => {
	it("Deve receber um erro, pois ID atividade não existe.", async () => {
		return await request
			.post("/atividades/infos")
			.send({
				descricao: 'Fiz mais uma tal coisa',
				categoria_id: 2,
				atividade_id: 9999,
				ticket: Atividade.ticket,
			})
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body).toHaveProperty('success', false);
				expect(res.body).toHaveProperty('message', 'Atividade não existe.')
			})
	})
	it("Deve receber um erro, pois o ticket da atividade não existe.", async () => {
		return await request
			.post("/atividades/infos")
			.send({
				descricao: "Fiz mais uma tal coisa",
				categoria_id: 2,
				atividade_id: 2,
				ticket: '9999.999.9999',
			})
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Ticket da atividade não existe."
				);
			});
	});
	it("Deve receber um erro, pois a categoria não existe.", async () => {
		return await request
			.post("/atividades/infos")
			.send({
				descricao: "Fiz mais uma tal coisa",
				categoria_id: 9999,
				atividade_id: 2,
				ticket: Atividade.ticket,
			})
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Categoria não existe."
				);
			});
	});
	it("Deve receber um erro, pois a categoria não existe, UPDATE.", async () => {
		return await request
			.put("/atividades/infos/1")
			.send({
				id: 1,
				descricao: "Fiz mais uma tal Alterada",
				categoria_id: 9999,
			})
			.set("access_token", Token())
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(400);
			});
	});
})
