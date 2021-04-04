const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes Sub-Categorias", () => {
	it("Deve receber todas as sub-categorias", async () => {
		return await request
			.get("/subcategorias")
			.set("access_token", Token())
			.then((res) => {
				console.log(res.body.data[0])
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("nome");
				expect(res.body.data[0]).toHaveProperty("user");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
				expect(res.body.data[0].categorias).toBeArray();
				expect(res.body.data[0].categorias[0]).toHaveProperty("id");
				expect(res.body.data[0].categorias[0]).toHaveProperty("nome");
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
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("nome");
				expect(res.body.data).toHaveProperty("user");
				expect(res.body.data).toHaveProperty("created_at");
				expect(res.body.data).toHaveProperty("updated_at");
				expect(res.body.data.categorias).toBeArray();
				expect(res.body.data.categorias[0]).toHaveProperty("id");
				expect(res.body.data.categorias[0]).toHaveProperty("nome");
			});
	});

	it("Deve registrar uma nova sub-categoria", async () => {
		return await request
			.post("/subcategorias")
			.set("access_token", Token())
			.send({
				nome: Math.floor(Math.random() * 9999) + "Teste",
			})
			.then((res) => {
				expect(res.status).toBe(201); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("nome");
			});
	});

	it("Deve alterar uma SubCategoria", async () => {
		return await request
			.put("/subcategorias/1")
			.set("access_token", Token())
			.send({
				id: 4,
				nome: Math.floor(Math.random() * 99) + "Teste alterado",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("nome");
			});
	});

	describe("Errors Sub-Categorias", () => {

		it("Deve retornar um error, pois está buscando sub-categoria que não existe", async () => {
			return await request
				.get("/subcategorias/9999")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Sub-Categoria não existe.");
				});
		});
		
		it("Deve retornar um error, pois o ID SubCategoria não existe", async () => {
			return await request
				.put("/subcategorias/1")
				.set("access_token", Token())
				.send({
					id: 9999,
					nome: Math.floor(Math.random() * 99) + "Teste alterado",
				})
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Sub-Categoria não existe.");
				});
		});

		it("Deve retornar um error, pois subcategoria não tem nome", async () => {
			return await request
				.post("/subcategorias")
				.set("access_token", Token())
				.send({
					nome: '',
				})
				.then((res) => {
					console.log(res.body)
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message","\"nome\" is not allowed to be empty")
				});
		});
	})

});
