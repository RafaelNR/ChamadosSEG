const App = require("../../backend/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes de Tasks", () => {
	it("Deve receber todos acompanhamentos de um task", async () => {
		return await request
			.get("/tarefas/acm/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");

				if (res.body.data.length > 0) {
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("descricao");
					expect(res.body.data[0]).toHaveProperty("user_id");
					expect(res.body.data[0]).toHaveProperty("type");
					expect(res.body.data[0]).toHaveProperty("nome");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				}
			});
	});
	it("Deve inserir um novo acompanhamento", async () => {
		return await request
			.post("/tarefas/acm/1")
			.set("access_token", Token())
			.send({
				type: "Teste",
				descricao: "Fiz tal coisa",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve alterar o acompanhamento", async () => {
		return await request
			.put("/tarefas/acm/1")
			.set("access_token", Token())
			.send({
				task_id: 1,
				type: "Teste",
				descricao: "Alterado Fiz tal coisa",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
});
