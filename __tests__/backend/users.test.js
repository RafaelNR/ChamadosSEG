const App = require("../../backend/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes de Usuários, com rotas definidas", () => {
	test("Deve receber todos os usuários cadastrados", async () => {
		return await request
			.get("/usuarios")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data
				expect(res.body.data.length).toBeGreaterThan(0); // deve ser maior que 0;
			});
	});

	test("Deve receber somente 1 usuário", async () => {
		return await request
			.get("/usuarios/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data;
				expect(res.body.data).toHaveProperty("id"); // deve possuir id;
				expect(res.body.data).toHaveProperty("nome"); // deve possuir nome;
				expect(res.body.data).toHaveProperty("user"); // deve possuir user;
				expect(res.body.data).toHaveProperty("email"); // deve possuir email;
				expect(res.body.data).toHaveProperty("telefone"); // deve possuir telefone;
				expect(res.body.data).toHaveProperty("actived"); // deve possuir actived;
				expect(res.body.data).toHaveProperty("role_id"); // deve possuir role_id;
				expect(res.body.data).toHaveProperty("clients"); // deve possuir clients;
				expect(res.body.data.clients).toBeArray();
				expect(res.body.data).not.toHaveProperty("passwd"); // não deve possuir passwd;
			});
	});

	describe("Testes de Usuários, validando erros ", () => {
		test("Devo receber um erro quando pesquisar ID usuário como string", async () => {
			return await request
				.get("/usuarios/nome")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401);
					expect(res.body).toHaveProperty("success", false);
				});
		});

		test("Devo receber um erro quando pesquisar ID usuário negativo", async () => {
			return await request
				.get("/usuarios/-1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401);
					expect(res.body).toHaveProperty("success", false);
				});
		});

		test("Devo receber um erro quando pesquisar ID usuário com caracteres", async () => {
			return await request
				.get("/usuarios/{{7+7}}")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401);
					expect(res.body).toHaveProperty("success", false);
				});
		});
		it("Devo receber um erro quando pesquisar usuário que não existe", async () => {
			return await request
				.get("/usuarios/9999")
				.set("access_token", Token())
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(401);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
	});
});
