const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Teste de Clients", () => {
	it("Deve me retornar dados de todos os clients", async () => {
		return await request
			.get("/clientes")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data
				expect(res.body.data.length).toBeGreaterThan(0); // deve ser maior que 0;
			});
	});

	it("Deve receber somente 1 cliente", async () => {
		return await request
			.get("/clientes/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data;
				expect(res.body.data).toHaveProperty("id"); // deve possuir id;
				expect(res.body.data).toHaveProperty("razao_social");
				expect(res.body.data).toHaveProperty("cnpj_cpf");
				expect(res.body.data).toHaveProperty("email");
				expect(res.body.data).toHaveProperty("telefone");
				expect(res.body.data).toHaveProperty("usuarios");
				expect(res.body.data.usuarios).toBeArray();
			});
	});

	it("Deve inserir um cliente novo", async () => {
		const rand = Math.floor(Math.random() * 99);
		const Dados = {
			razao_social: "Empresa Razão Social" + rand,
			nome_fantasia: "Empresa " + rand,
			cnpj_cpf: "11.111.110/0001-" + rand,
			email: rand + "client@client.com",
			telefone: "9" + Math.floor(Math.random() * 9999999999),
			user_id: 1,
		};
		return await request
			.post("/clientes/")
			.set("access_token", Token())
			.send(Dados)
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});

	it("Deve fazer o update do cliente", async () => {
		const rand = Math.floor(Math.random() * 99);
		const Dados = {
			id: 2,
			razao_social: "Empresa Razão Social" + rand,
			nome_fantasia: "Empresa " + rand,
			cnpj_cpf: "11.111.110/0001-" + rand,
			email: rand + "client@client.com",
			telefone: "9" + Math.floor(Math.random() * 9999999999),
			user_id: 1,
		};
		return await request
			.put("/clientes/" + Dados.id)
			.set("access_token", Token())
			.send(Dados)
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body.data).toHaveProperty("id"); // deve possuir id;
				expect(res.body.data).toHaveProperty("razao_social");
				expect(res.body.data).toHaveProperty("cnpj_cpf");
				expect(res.body.data).toHaveProperty("email");
				expect(res.body.data).toHaveProperty("telefone");
				expect(res.body.data).toHaveProperty("usuarios");
				expect(res.body.data.usuarios).toBeArray();
			});
	});

	describe("Testes de Usuários, validando erros ", () => {
		it("Devo receber um erro quando pesquisar ID client como string", async () => {
			return await request
				.get("/clientes/id")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body.error).toHaveProperty("validationError", true);
				});
		});
		it("Devo receber um erro quando pesquisar ID client como numero negativo", async () => {
			return await request
				.get("/clientes/-1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body.error).toHaveProperty("validationError", true);
				});
		});
		it("Devo receber um erro quando pesquisar ID client como caracteres", async () => {
			return await request
				.get("/clientes/-1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body.error).toHaveProperty("validationError", true);
				});
		});
		it("Devo receber um erro quando pesquisar cliente que não existe", async () => {
			return await request
				.get("/clientes/9999")
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
