const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes Categorias", () => {
	it("Deve receber todas as categorias", async () => {
		return await request
		.get("/categorias")
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(200); // Deve ser;
			expect(res.body).toHaveProperty("success", true);
			expect(res.body).toHaveProperty("data");
			expect(res.body.data[0]).toHaveProperty("id");
			expect(res.body.data[0]).toHaveProperty("nome");
			expect(res.body.data[0]).toHaveProperty("user");
			expect(res.body.data[0]).toHaveProperty("subCategorias");
			expect(res.body.data[0].subCategorias).toBeArray();
			if (res.body.data[0].subCategorias.length > 0) {
				expect(res.body.data[0].subCategorias[0]).toHaveProperty("id");
				expect(res.body.data[0].subCategorias[0]).toHaveProperty("nome");
			}
		});
	});

	it("Deve receber um categoria e se tiver, as suas subcategorias.", async () => {
		return await request
			.get("/categorias/1")
			.set("access_token", Token())
			.then((res) => {
				console.log(res.body)
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("nome");
				expect(res.body.data).toHaveProperty("user");
				expect(res.body.data).toHaveProperty("subCategorias");
				if (res.body.data.subCategorias[0]) {
					expect(res.body.data.subCategorias).toBeArray();
					expect(res.body.data.subCategorias[0]).toHaveProperty("id");
					expect(res.body.data.subCategorias[0]).toHaveProperty("nome");
				}
			});
	});

	it("Deve registrar uma categoria", async () => {
		return await request
			.post("/categorias")
			.set("access_token", Token())
			.send({
				nome: Math.floor(Math.random() * 999) + "Teste",
				subCategorias:[1]
			})
			.then((res) => {
				expect(res.status).toBe(201); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("nome");
				expect(res.body.data).toHaveProperty("created_at");
				expect(res.body.data).toHaveProperty("updated_at");
			});
	});

	it("Deve alterar uma categoria", async () => {
		return await request
			.put("/categorias/1")
			.set("access_token", Token())
			.send({
				id: 1,
				nome: Math.floor(Math.random() * 99) + "Teste alterado",
				subCategorias:[1,2]
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("nome");
				expect(res.body.data).toHaveProperty("created_at");
				expect(res.body.data).toHaveProperty("updated_at");
				expect(res.body.data.subCategorias).toBeArray();
				expect(res.body.data.subCategorias[0]).toHaveProperty("id")
				expect(res.body.data.subCategorias[0]).toHaveProperty("nome")
			});
	});

	describe("Errors Sub-Categorias", () => {
		it("Deve receber um erro na busca, pois ID não existe", async () => {
			return await request
				.get("/categorias/99999")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Categoria não existe");
				});
		});
		it("Deve receber um erro ao inserir categoria, pois não tem categoria vinculada", async () => {
			return await request
				.post("/categorias")
				.set("access_token", Token())
				.send({
					nome: Math.floor(Math.random() * 99) + "Teste",
					subCategorias:[]
				})
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Deve selecionar pelo menos uma Sub-Categoria");
				});
		});
		it("Deve receber um erro ao inserir categoria, pois nome está em Branco", async () => {
			return await request
				.post("/categorias")
				.set("access_token", Token())
				.send({
					nome: '',
					subCategorias:[1]
				})
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "\"nome\" não pode estar em branco");
				});
		});
		it("Deve receber um erro ao editar categoria, pois nome está em Branco", async () => {
			return await request
				.post("/categorias")
				.set("access_token", Token())
				.send({
					id: 2,
					nome: '',
					subCategorias:[1]
				})
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "\"nome\" não pode estar em branco");
				});
		});
		it("Deve receber um erro ao editar categoria, pois não tem categoria vinculada", async () => {
			return await request
				.post("/categorias")
				.set("access_token", Token())
				.send({
					id: 2,
					nome: Math.floor(Math.random() * 99) + "Teste",
					subCategorias:[]
				})
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Deve selecionar pelo menos uma Sub-Categoria");
				});
		});
	})

});
