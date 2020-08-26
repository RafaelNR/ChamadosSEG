// const App = require("../../backend/core/app");

const Log = require("../../backend/controllers/log");

it("Deve validar o insert do log", async () => {
	const res = await Log.Save(1, "log", "test", null);

	expect(res).toHaveProperty("user_id", 1);
	expect(res).toHaveProperty("type", "log");
	expect(res).toHaveProperty("category", "test");
	expect(res).toHaveProperty("error", null);
	expect(res).toHaveProperty("created_at");
	expect(res).toHaveProperty("updated_at");
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
	expect(res).toHaveProperty("created_at");
	expect(res).toHaveProperty("updated_at");
});
