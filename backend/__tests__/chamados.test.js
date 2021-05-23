const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token, TokenTecnico } = require("./auth.test");

describe("Testes Chamado, UPDATE", () => {
	it("Deve atualizar a informação de um chamado, ADMIN.", async () => {
		return await request
			.put("/chamados/1")
			.set("access_token", Token())
			.send({
				tecnico_requerente: 1,
				tecnico_atribuido: 12,
				cliente_atribuido: 1,
				prioridade: 3,
				status: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição alterado.",
			})
			.then((res) => {
				console.log(res.body)
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve atualizar a informação de um chamado, Técnico.", async () => {
		return await request
			.put("/chamados/2")
			.set("access_token", TokenTecnico())
			.send({
				tecnico_atribuido: 12,
				prioridade: 3,
				status: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição alterado tecnico.",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve atualizar a informação de um chamado, Técnico.", async () => {
		return await request
			.put("/chamados/8")
			.set("access_token", TokenTecnico())
			.send({
				prioridade: 3,
				status: 1,
				titulo: "Teste 01",
				descricao: "Teste 02 Descrição alterado tecnico.",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve receber um erro póis está atribuindo cliente, TÉCNICO.", async () => {
		return await request
			.put("/chamados/2")
			.set("access_token", TokenTecnico())
			.send({
				tecnico_atribuido: 1,
				cliente_atribuido: 1,
				prioridade: 3,
				status: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição alterado.",
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
			.put("/chamados/2")
			.set("access_token", TokenTecnico())
			.send({
				tecnico_requerente: 20,
				tecnico_atribuido: 1,
				cliente_atribuido: 1,
				prioridade: 3,
				status: 1,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição alterado.",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty(
					"message",
					"Você não pode alterar o técnico requerente."
				);
			});
	});
});

describe("Testes Chamado, INSERT", () => {
	it("Deve inserir um chamado como administrador.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				tecnico_requerente: 1,
				tecnico_atribuido: 1,
				cliente_atribuido: 1,
				prioridade: 3,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve inserir chamado para outro técnico.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				tecnico_requerente: 2,
				tecnico_atribuido: 1,
				cliente_atribuido: 1,
				prioridade: 3,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Devo receber um erro póis estou inserindo chamado para cliente que não existe.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", Token())
			.send({
				tecnico_requerente: 1,
				tecnico_atribuido: 1,
				cliente_atribuido: 99,
				prioridade: 3,
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
				tecnico_requerente: 99,
				tecnico_atribuido: 1,
				cliente_atribuido: 1,
				prioridade: 3,
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
				tecnico_requerente: 1,
				tecnico_atribuido: 99,
				cliente_atribuido: 1,
				prioridade: 3,
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
				tecnico_requerente: 20,
				tecnico_atribuido: 1,
				cliente_atribuido: 1,
				prioridade: 3,
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
				tecnico_requerente: 1,
				tecnico_atribuido: 1,
				cliente_atribuido: 1,
				prioridade: 3,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Você não tem permissão para requerer chamados de outro usuário."
				);
			});
	});
	it("Deve receber um erro quando inserir chamado, com técnico atribuido não existe.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", TokenTecnico())
			.send({
				tecnico_requerente: 20,
				tecnico_atribuido: 99,
				cliente_atribuido: 1,
				prioridade: 3,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Técnico atribuído não existe."
				);
			});
	});
	it("Deve receber um erro quando inserir chamado para cliente não existe.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", TokenTecnico())
			.send({
				tecnico_requerente: 20,
				tecnico_atribuido: 1,
				cliente_atribuido: 5,
				prioridade: 3,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty("message", "Cliente não existe.");
			});
	});
	it("Deve receber um erro quando inserir chamado para cliente sem vinculo com o técnico requerente.", async () => {
		return await request
			.post("/chamados")
			.set("access_token", TokenTecnico())
			.send({
				tecnico_requerente: 20,
				tecnico_atribuido: 1,
				cliente_atribuido: 10,
				prioridade: 3,
				titulo: "Teste 01",
				descricao: "Teste 01 Descrição",
			})
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Técnico requerente sem vinculo com esse cliente."
				);
			});
	});
	it("Deve receber um erro quando inserir chamado para cliente sem vinculo com o técnico atribuido .", async () => {
		return await request
			.post("/chamados")
			.set("access_token", TokenTecnico())
			.send({
				tecnico_requerente: 20,
				tecnico_atribuido: 5,
				cliente_atribuido: 1,
				prioridade: 3,
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
	it("Deve receber todos os chamados", async () => {
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
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
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
				expect(res.body.data).toHaveProperty("tecnico_id"	);
				expect(res.body.data).toHaveProperty("atribuido");
				expect(res.body.data).toHaveProperty("cliente");
				expect(res.body.data).toHaveProperty("cliente_id");
				expect(res.body.data).toHaveProperty("status");
				expect(res.body.data).toHaveProperty("prioridade");
				expect(res.body.data).toHaveProperty("created_at");
				expect(res.body.data).toHaveProperty("updated_at");
			});
	});
	it("Deve receber um chamado como admin.", async () => {
		return await request
			.get("/chamados/2")
			.set("access_token", TokenTecnico())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data).toHaveProperty("id");
				expect(res.body.data).toHaveProperty("requerente");
				expect(res.body.data).toHaveProperty("requerente_id");
				expect(res.body.data).toHaveProperty("tecnico_id");
				expect(res.body.data).toHaveProperty("atribuido");
				expect(res.body.data).toHaveProperty("cliente");
				expect(res.body.data).toHaveProperty("cliente_id");
				expect(res.body.data).toHaveProperty("status");
				expect(res.body.data).toHaveProperty("prioridade");
				expect(res.body.data).toHaveProperty("created_at");
				expect(res.body.data).toHaveProperty("updated_at");
			});
	});
	it("Deve receber os dados do chamado cmo técnico.", async () => {
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
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("requerente");
				expect(res.body.data[0]).toHaveProperty("requerente_id");
				expect(res.body.data[0]).toHaveProperty("atribuido");
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});
	it("Deve receber todos os chamados requeridos por um usuário.", async () => {
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
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});
	it("Deve receber todos os chamados atribuídos a mim.", async () => {
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
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});
	it("Deve receber todos os chamados atribuídos a um usuário.", async () => {
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
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});
	it("Deve receber todos os chamados de um cliente.", async () => {
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
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});
	it("Deve receber erro, pois requerente não existe.", async () => {
		await request
			.get("/chamados/requerente/user/99")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty("message", "Usuário não existe.");
			});
	});
	it("Deve receber erro, pois atribuido não existe.", async () => {
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
	it("Deve receber todos os chamados", async () => {
		return await request
			.get("/chamados")
			.set("access_token", TokenTecnico())
			.then((res) => {
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty("message", "Você não tem permissão.");
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
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
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
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
				expect(res.body.data[0]).toHaveProperty("created_at");
				expect(res.body.data[0]).toHaveProperty("updated_at");
			});
	});
	it("Deve receber todos os chamados atribuídos a um usuário.", async () => {
		return await request
			.get("/chamados/atribuido/user/2")
			.set("access_token", TokenTecnico())
			.then((res) => {
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty("message", "Você não tem permissão.");
			});
	});
	it("Deve receber todos os chamados de um cliente.", async () => {
		return await request
			.get("/chamados/cliente/1")
			.set("access_token", TokenTecnico())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				expect(res.body.data[0]).toHaveProperty("id");
				expect(res.body.data[0]).toHaveProperty("requerente");
				expect(res.body.data[0]).toHaveProperty("requerente_id");
				expect(res.body.data[0]).toHaveProperty("atribuido");
				expect(res.body.data[0]).toHaveProperty("tecnico_id");
				expect(res.body.data[0]).toHaveProperty("cliente");
				expect(res.body.data[0]).toHaveProperty("cliente_id");
				expect(res.body.data[0]).toHaveProperty("status");
				expect(res.body.data[0]).toHaveProperty("prioridade");
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
			.get("/chamados/cliente/2")
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
