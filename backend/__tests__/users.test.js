const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes de Usuários, com rotas definidas", () => {
	it("Deve receber todos os usuários cadastrados", async () => {
		return await request
			.get("/usuarios")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data
				expect(res.body.data.length).toBeGreaterThan(0); // deve ser maior que 0;
			});
	});

	it("Deve receber somente 1 usuário", async () => {
		return await request
			.get("/usuarios/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data;
				expect(res.body.data).toHaveProperty("id", 1); // deve possuir id;
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

	it("Deve receber os clientes do meu usuário logado.", async () => {
		return await request
			.get("/usuarios/clientes/1")
			.set("access_token", Token())
			.then((res) => {
				console.log(res.body)
				expect(res.status).toBe(200);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("razao_social");
				expect(res.body.data[0]).toHaveProperty("nome_fantasia");
				expect(res.body.data[0]).toHaveProperty("cnpj_cpf");
				expect(res.body.data[0]).toHaveProperty("email");
			});
	});

	it("Deve inserir usuário, sem clientes", async () => {
		const rand = Math.floor(Math.random() * 9999);
		const Dados = {
			nome: "Nome Teste " + rand,
			user: "user" + rand,
			passwd: "batata15",
			email: rand + "teste@seg.eti.br",
			telefone: "9" + Math.floor(Math.random() * 9999999999),
			role_id: 1,
			actived: 1,
		};
		return await request
			.post("/usuarios/")
			.set("access_token", Token())
			.send(Dados)
			.then((res) => {
				console.log(res.body)
				expect(res.status).toBe(201); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
			});
	});

	it("Deve inserir usuário, com clientes", async () => {
		const rand = Math.floor(Math.random() * 9999);
		const Dados = {
			nome: "Nome Teste " + rand,
			user: "user" + rand,
			passwd: "batata15",
			email: rand + "teste@seg.eti.br",
			telefone: "9" + Math.floor(Math.random() * 9999999999),
			role_id: 1,
			actived: 1,
			clients: [1],
		};
		return await request
			.post("/usuarios/")
			.set("access_token", Token())
			.send(Dados)
			.then((res) => {
				expect(res.status).toBe(201); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
			});
	});

	it("Deve fazer update dos dados do usuário, sem clientes", async () => {
		let rand = Math.floor(Math.random() * 999);
		const Dados = {
			id: 3,
			nome: "Rafael Alterado" + rand,
			passwd: "Jose",
			email: rand + "alterado@seg.eti.br",
			telefone: "9" + Math.floor(Math.random() * 9999999999),
			role_id: 1,
			actived: 1,
		};
		return await request
			.put("/usuarios/" + Dados.id)
			.set("access_token", Token())
			.send(Dados)
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data;
				expect(res.body.data).toHaveProperty("id"); // deve possuir nome;
				expect(res.body.data).toHaveProperty("nome"); // deve possuir nome;
				expect(res.body.data).toHaveProperty("user"); // deve possuir user;
				expect(res.body.data).toHaveProperty("email"); // deve possuir email;
				expect(res.body.data).toHaveProperty("telefone"); // deve possuir telefone;
				expect(res.body.data).toHaveProperty("actived"); // deve possuir actived;
				expect(res.body.data).toHaveProperty("role_id"); // deve possuir role_id;
				expect(res.body.data).not.toHaveProperty("passwd"); // não deve possuir passwd;
				if (Dados.clients && Dados.clients.length > 0) {
					expect(res.body.data).toHaveProperty("clients");
					expect(res.body.data.clients).toBeArray();
				}
			});
	});


	it("Deve fazer update dos dados do usuário, com clientes", async () => {
		let rand = Math.floor(Math.random() * 99);
		const Dados = {
			id: 2,
			nome: "Rafael Alterado" + rand,
			passwd: "batata15",
			email: rand + "alterado@seg.eti.br",
			telefone: "9" + Math.floor(Math.random() * 9999999999),
			role_id: 1,
			actived: 1,
			clients: [1],
		};
		return await request
			.put("/usuarios/" + Dados.id)
			.set("access_token", Token())
			.send(Dados)
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("data"); // deve possuir a propriedade data;
				expect(res.body.data).toHaveProperty("id"); // deve possuir nome;
				expect(res.body.data).toHaveProperty("nome"); // deve possuir nome;
				expect(res.body.data).toHaveProperty("user"); // deve possuir user;
				expect(res.body.data).toHaveProperty("email"); // deve possuir email;
				expect(res.body.data).toHaveProperty("telefone"); // deve possuir telefone;
				expect(res.body.data).toHaveProperty("actived"); // deve possuir actived;
				expect(res.body.data).toHaveProperty("role_id"); // deve possuir role_id;
				expect(res.body.data).not.toHaveProperty("passwd"); // não deve possuir passwd;
				if (Dados.clients && Dados.clients.length > 0) {
					expect(res.body.data).toHaveProperty("clients");
					expect(res.body.data.clients).toBeArray();
				}
			});
	});

	describe("Testes de Usuários, validando erros ", () => {
		test("Devo receber um erro quando pesquisar ID usuário como string", async () => {
			return await request
				.get("/usuarios/nome")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("success", false);
				});
		});

		test("Devo receber um erro quando pesquisar ID usuário negativo", async () => {
			return await request
				.get("/usuarios/-1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("success", false);
				});
		});

		test("Devo receber um erro quando pesquisar ID usuário com caracteres", async () => {
			return await request
				.get("/usuarios/{{7+7}}")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("success", false);
				});
		});
		it("Devo receber um erro quando pesquisar usuário que não existe", async () => {
			return await request
				.get("/usuarios/9999")
				.set("access_token", Token())
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Usuário não existe.");
				});
		});
		it("Deve receber um erro pois estou inserindo usuário/nome/telefone que já existe.", async () => {
			//const rand = Math.floor(Math.random() * 99);
			const Dados = {
				nome: "Rafael Rodrigues",
				user: "user",
				passwd: "batata15",
				email: "teste@seg.eti.br",
				telefone: "93269598585",
				role_id: 1,
				actived: 1,
				clients: [1],
			};
			return await request
				.post("/usuarios/")
				.set("access_token", Token())
				.send(Dados)
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", 'O valor Rafael Rodrigues já possui registro no banco e não pode ser duplicado.');
				});
		});

		it("Deve receber um erro pois estou fazendo o update de usuário/nome/telefone que já existe.", async () => {
			//const rand = Math.floor(Math.random() * 99);
			const Dados = {
				id: 2,
				nome: "Rafael Rodrigues",
				passwd: "batata15",
				email: "teste@seg.eti.br",
				telefone: "93269598585",
				role_id: 1,
				actived: 1,
				clients: [1],
			};
			return await request
				.put("/usuarios/2")
				.set("access_token", Token())
				.send(Dados)
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", 'O valor Rafael Rodrigues já possui registro no banco e não pode ser duplicado.');
				});
		});
	});
});
