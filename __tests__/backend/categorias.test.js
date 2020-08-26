const App = require("../../backend/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes Categorias", () => {
	test("Deve receber todas as atividades", async () => {
		return await request
			.get("/categorias")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("nome");
			});
	});

	test("Deve receber um categoria e se tiver as suas subcategorias.", async () => {
		return await request
			.get("/categorias/2")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("nome");
				expect(res.body.data).toHaveProperty("subCategorias");
				if (res.body.data.subCategorias[0]) {
					expect(res.body.data.subCategorias).toBeArray();
					expect(res.body.data.subCategorias[0]).toHaveProperty("id");
					expect(res.body.data.subCategorias[0]).toHaveProperty("nome");
				}
			});
	});
});
it("Deve receber um erro, pois ID não existe", async () => {
	return await request
		.get("/categorias/99999")
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(401); // Deve ser;
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("error");
		});
});
