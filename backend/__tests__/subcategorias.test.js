const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes Sub-Categorias", () => {
	it("Deve receber todas as sub-categorias", async () => {
		return await request
			.get("/subcategorias")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("nome");
				expect(res.body.data[0]).toHaveProperty("user");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});

	it("Deve receber um sub-categoria.", async () => {
		return await request
			.get("/subcategorias/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("nome");
				expect(res.body.data[0]).toHaveProperty("user");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});

	it("Deve receber todas sub-categoria, vinculado a um categoria.", async () => {
		return await request
			.get("/subcategorias/categoria/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("nome");
				expect(res.body.data[0]).toHaveProperty("user");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});

	it("Deve registrar uma nova sub-categoria", async () => {
		return await request
			.post("/subcategorias")
			.set("access_token", Token())
			.send({
				nome: Math.floor(Math.random() * 9999) + "Teste",
				categoria_id: 1
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
			});
	});

	it("Deve alterar uma SubCategoria", async () => {
		return await request
			.put("/subcategorias/1")
			.set("access_token", Token())
			.send({
				id: 2,
				nome: Math.floor(Math.random() * 99) + "Teste alterado",
				categoria_id: 1,
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
			});
	});

	describe("Errors Sub-Categorias", () => {

		it("Deve retornar um error, pois está buscando sub-categoria que não existe", async () => {
			return await request
				.get("/subcategorias/9999")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
					expect(res.body.error).toBe("SubCategoria não existe.");
				});
		});
		
		it("Deve retornar um error, pois o ID SubCategoria não existe", async () => {
			return await request
				.put("/subcategorias/1")
				.set("access_token", Token())
				.send({
					id: 9999,
					nome: Math.floor(Math.random() * 99) + "Teste alterado",
					categoria_id: 1,
				})
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
					expect(res.body.error).toBe("SubCategoria não existe.");
				});
		});
		it("Deve retornar um error, pois subcategoria já está vinculado a categoria", async () => {
			return await request
				.post("/subcategorias")
				.set("access_token", Token())
				.send({
					nome: "Teste",
					categoria_id: 1,
				})
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
					expect(res.body.error).toBe(
						"Já existe essa sub-categoria, vinculado a categoria."
					);
				});
		});
	})

});
