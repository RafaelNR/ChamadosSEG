const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token, TokenTecnico } = require("./auth.test");

describe("Testes Chamado, UPDATE", () => {
	describe("Teste de alterações com requisições de ADM", () => {
		it("Deve atualizar a informação de um chamado.", async () => {
			return await request
				.put("/chamados/1")
				.set("access_token", Token())
				.send({
					atribuido: 2,
					status: "Pendente Aprovação",
					titulo: "Teste 01",
					descricao: "Teste 01 Descrição alterado adm.",
				})
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
				});
		});
		it("Retornando o status de um chamado de pendente aprovação para em andamento.", async () => {
			return await request
				.put("/chamados/1")
				.set("access_token", Token())
				.send({
					status: "Em Andamento",
				})
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
				});
		});
	});
	describe("Teste de alterações com requisições de Técnico", () => {
		it("Deve atualizar a informação de um chamado, Técnico.", async () => {
			return await request
				.put("/chamados/2")
				.set("access_token", TokenTecnico())
				.send({
					atribuido: 1,
					titulo: "Teste 01",
					descricao: "Teste 01 Descrição alterado tecnico.",
				})
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
				});
		});
		it("Deve atualizar o status do chamado, Técnico.", async () => {
			return await request
				.put("/chamados/4")
				.set("access_token", TokenTecnico())
				.send({
					prioridade: 1,
					status: "Em Andamento",
				})
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
				});
		});
		it("Deve receber um erro, poís não pode retornar o status do chamado.", async () => {
			return await request
				.put("/chamados/4")
				.set("access_token", TokenTecnico())
				.send({
					status: "Aberto",
				})
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty(
						"message",
						"Você não tem permissão para retornar o status anterior do chamado."
					);
				});
		});
		it("Deve receber um erro póis está atribuindo cliente, com acesso de técnico", async () => {
			return await request
				.put("/chamados/4")
				.set("access_token", TokenTecnico())
				.send({
					cliente_id: 1,
				})
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty(
						"message",
						"Você não pode alterar o cliente atribuído."
					);
				});
		});
		it("Deve receber um erro póis está atribuindo requerente, TÉCNICO.", async () => {
			return await request
				.put("/chamados/4")
				.set("access_token", TokenTecnico())
				.send({
					requerente: 1,
				})
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty(
						"message",
						"Você não tem permissão para requerer ou alterar chamados de outro usuário."
					);
				});
		});
	});


});

describe("Testes Chamado, INSERT", () => {
	it("Deve inserir um chamado como administrador.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				requerente: 1,
				atribuido: 1,
				cliente_id: 1,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve pdoer inserir chamado para outro usuário.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				requerente: 2,
				atribuido: 1,
				cliente_id: 2,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Devo receber um erro, póis estou inserindo chamado para cliente que não existe.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				requerente: 1,
				atribuido: 1,
				cliente_id: 99,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty("message", "Cliente não existe.");
			});
	});
	it("Devo receber um erro póis estou inserindo técnico requerente que não existe.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				requerente: 99,
				atribuido: 1,
				cliente_id: 1,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Técnico requerente não existe."
				);
			});
	});
	
	it("Devo receber um erro póis estou inserindo técnico atribuido que não existe.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				requerente: 1,
				atribuido: 99,
				cliente_id: 1,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Técnico atribuído não existe."
				);
			});
	});
	it("Deve inserir chamado como técnico.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", TokenTecnico())
			.send({
				requerente: 2,
				atribuido: 1,
				cliente_id: 2,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve receber um erro quando inserir chamado para outro técnico requerente.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", TokenTecnico())
			.send({
				requerente: 1,
				atribuido: 1,
				cliente_id: 1,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Você não tem permissão para requerer ou alterar chamados de outro usuário."
				);
			});
	});
	it("Deve receber um erro quando inserir chamado para cliente sem vinculo com o técnico atribuido .", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				requerente: 1,
				atribuido: 2,
				cliente_id: 1,
				categoria_id: 1,
				sub_categoria_id: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Técnico atribuido sem vinculo com esse cliente."
				);
			});
	});
});

describe("Testes Chamado, acesso de ADMIN", () => {
	it("Deve receber todos os chamados, requeridos por um usuário admin.", async () => {
		return await request
			.get("/chamados")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("requerente");
				expect(res.body.data[0]).toHaveProperty("requerente_id");
				expect(res.body.data[0]).toHaveProperty("atribuido");
				expect(res.body.data[0]).toHaveProperty("atribuido_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
				expect(res.body.data[0]).toHaveProperty("categoria");
				expect(res.body.data[0]).toHaveProperty("categoria_id");
				expect(res.body.data[0]).toHaveProperty("sub_categoria");
				expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});
	it("Deve receber um chamado como admin.", async () => {
		return await request
			.get("/chamados/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("requerente");
				expect(res.body.data).toHaveProperty("requerente_id");
				expect(res.body.data).toHaveProperty("atribuido");
				expect(res.body.data).toHaveProperty("atribuido_id");
				expect(res.body.data).toHaveProperty("cliente");
				expect(res.body.data).toHaveProperty("cliente_id");
				expect(res.body.data).toHaveProperty("status");
				expect(res.body.data).toHaveProperty("prioridade");
				expect(res.body.data).toHaveProperty("categoria");
				expect(res.body.data).toHaveProperty("categoria_id");
				expect(res.body.data).toHaveProperty("sub_categoria");
				expect(res.body.data).toHaveProperty("sub_categoria_id");
				expect(res.body.data).toHaveProperty("created_at");
				expect(res.body.data).toHaveProperty("updated_at");
			});
	});
		it("Deve receber todos os chamados requeridos por mim, usuário admin.", async () => {
			return await request
				.get("/chamados/requerente/my")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todos os chamados requeridos de usuário, requerido por um usuário admin.", async () => {
			return await request
				.get("/chamados/requerente/user/1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todos os chamados atribuídos a mim, usuário admin.", async () => {
			return await request
				.get("/chamados/atribuido/my")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todos os chamados atribuídos a um usuário, requeridos por um usuário admin.", async () => {
			return await request
				.get("/chamados/atribuido/user/1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todos os chamados de um cliente, requeridos por um usuário admin.", async () => {
			return await request
				.get("/chamados/cliente/1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber erro, pois usuário requerente não existe.", async () => {
			await request
				.get("/chamados/requerente/user/99")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Usuário não existe.");
				});
		});
		it("Deve receber erro, pois usuário atribuido não existe.", async () => {
			return await request
				.get("/chamados/atribuido/user/99")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Usuário não existe.");
				});
		});
		it("Deve receber erro, pois cliente não existe.", async () => {
			return await request
				.get("/chamados/cliente/99")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Cliente não existe.");
				});
		});
	});

	describe("Testes Chamados, acesso de Técnico", () => {
			it("Deve receber um erro, poís não pode solicitar todos os chamdos", async () => {
				return await request
					.get("/chamados")
					.set("access_token", TokenTecnico())
					.then((res) => {
						expect(res.status).toBe(400); // Deve ser;
						expect(res.body).toHaveProperty("success", false);
						expect(res.body).toHaveProperty("message", "Você não tem permissão.");
					});
			});
		it("Deve receber um chamado vinculado a mim, usuário técnico.", async () => {
			return await request
				.get("/chamados/2")
				.set("access_token", TokenTecnico())
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body.data).toHaveProperty("id");
					expect(res.body.data).toHaveProperty("requerente");
					expect(res.body.data).toHaveProperty("requerente_id");
					expect(res.body.data).toHaveProperty("atribuido");
					expect(res.body.data).toHaveProperty("atribuido_id");
					expect(res.body.data).toHaveProperty("cliente");
					expect(res.body.data).toHaveProperty("cliente_id");
					expect(res.body.data).toHaveProperty("status");
					expect(res.body.data).toHaveProperty("prioridade");
					expect(res.body.data).toHaveProperty("categoria");
					expect(res.body.data).toHaveProperty("categoria_id");
					expect(res.body.data).toHaveProperty("sub_categoria");
					expect(res.body.data).toHaveProperty("sub_categoria_id");
					expect(res.body.data).toHaveProperty("created_at");
					expect(res.body.data).toHaveProperty("updated_at");
				});
		});
		it("Deve receber um erro, poís o chamado não pertence a min, acesso técnico.", async () => {
			return await request
				.get("/chamados/1")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty(
						"message",
						"Você não ter permissão para abrir esse chamado."
					);
				});
		});
		it("Deve receber todos os chamados requeridos por mim.", async () => {
			return await request
				.get("/chamados/requerente/my")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todos os chamados requeridos por um usuário.", async () => {
			return await request
				.get("/chamados/requerente/user/1")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Você não tem permissão.");
				});
		});
		it("Deve receber todos os chamados atribuídos a mim.", async () => {
			return await request
				.get("/chamados/atribuido/my")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todos os chamados atribuídos a um usuário, não sendo eu.", async () => {
			return await request
				.get("/chamados/atribuido/user/1")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Você não tem permissão.");
				});
		});
		it("Deve receber todos os chamados de um cliente, vinculados a mim, acesso técnico", async () => {
			return await request
				.get("/chamados/cliente/2")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("requerente");
					expect(res.body.data[0]).toHaveProperty("requerente_id");
					expect(res.body.data[0]).toHaveProperty("atribuido");
					expect(res.body.data[0]).toHaveProperty("atribuido_id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("prioridade");
					expect(res.body.data[0]).toHaveProperty("categoria");
					expect(res.body.data[0]).toHaveProperty("categoria_id");
					expect(res.body.data[0]).toHaveProperty("sub_categoria");
					expect(res.body.data[0]).toHaveProperty("sub_categoria_id");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber erro, pois usuário(técnico) não tem permissão, requerente.", async () => {
			await request
				.get("/chamados/requerente/user/99")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Você não tem permissão.");
				});
		});
		it("Deve receber erro, pois usuário(técnico) não tem permissão, atribuido.", async () => {
			return await request
				.get("/chamados/atribuido/user/99")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Você não tem permissão.");
				});
		});
		it("Deve receber erro, pois usuário(técnico) sem vinculo com o cliente.", async () => {
			return await request
				.get("/chamados/cliente/1")
				.set("access_token", TokenTecnico())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty(
						"message",
						"Usuário sem vinculo com esse cliente."
					);
				});
		});
	});
