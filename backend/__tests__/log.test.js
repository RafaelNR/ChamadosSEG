const App = require("../src/core/app");
const request = require("supertest")(App);
const { Token } = require("./auth.test");
const Log = require("../src/classes/log.class");

describe("Testes Log", () => {
	it("Deve receber todas os logs", async () => {
		return await request
		.get("/log")
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(200); // Deve ser;
			expect(res.body).toHaveProperty("success", true);
			expect(res.body).toHaveProperty("data");
			expect(res.body.data[0]).toHaveProperty("id");
			expect(res.body.data[0]).toHaveProperty("type");
			expect(res.body.data[0]).toHaveProperty("category");
			expect(res.body.data[0]).toHaveProperty("error");
			expect(res.body.data[0]).toHaveProperty("nome");
			expect(res.body.data[0]).toHaveProperty("user");
			expect(res.body.data[0]).toHaveProperty("created_at");
			expect(res.body.data[0]).toHaveProperty("updated_at");
		});
	});
	it("Deve inserir log", async () => {
			const res = await Log.Save(1, "log", "test", null);
			console.log(res)
		
			expect(res).toHaveProperty("user_id", 1);
			expect(res).toHaveProperty("type", "log");
			expect(res).toHaveProperty("category", "test");
			expect(res).toHaveProperty("error", null);
	});
	it("Deve gerar um erro quando inserir no log, um user_id diferente de inteiro positivo", async () => {
		const res = await Log.Save(-1, "log", "test", null);

		expect(res).toHaveProperty("success", false);
		expect(res).toHaveProperty("validationError", true);
		expect(res.error.details[0]).toHaveProperty("path", ["user_id"]);
	});

	it("Deve gerar um erro quando inserir no log, um type diferente de string ", async () => {
		const res = await Log.Save(1, null, "test", null);
		expect(res).toHaveProperty("success", false);
		expect(res).toHaveProperty("validationError", true);
		expect(res.error.details[0]).toHaveProperty("path", ["type"]);
	});

	it("Deve gerar um erro quando inserir no log, um category diferente de string ", async () => {
		const res = await Log.Save(1, "log", null, null);
		expect(res).toHaveProperty("success", false);
		expect(res).toHaveProperty("validationError", true);
		expect(res.error.details[0]).toHaveProperty("path", ["category"]);
	});

	it("Deve gerar um erro simples", async () => {
		const res = await Log.Save(1, "log", "test", {
			success: false,
			error: "Erro simples gerado pelo teste",
		});
		expect(res).toHaveProperty("user_id", 1);
		expect(res).toHaveProperty("type", "log");
		expect(res).toHaveProperty("category", "test");
		expect(res).toHaveProperty("error", "Erro simples gerado pelo teste");
	});
});