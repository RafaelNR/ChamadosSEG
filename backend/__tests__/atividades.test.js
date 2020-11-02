const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("itens de Atividades", () => {
	describe("Pesquisa uma atividade, sem erro", () => {
		it("Deve receber todas as atividades", async () => {
			return await request
				.get("/atividades")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("ticket");
					expect(res.body.data[0]).toHaveProperty("técnico");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todas as minhas atividades", async () => {
			return await request
				.get("/atividades/user")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("ticket");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("técnico");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todas as atividades de um usuário", async () => {
			return await request
				.get("/atividades/user/2")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("ticket");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("técnico");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber todas atividades de um cliente", async () => {
			return await request
				.get("/atividades/cliente/1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("ticket");
					expect(res.body.data[0]).toHaveProperty("cliente");
					expect(res.body.data[0]).toHaveProperty("técnico");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				});
		});
		it("Deve receber atividade que existe pelo ID dela", async () => {
			return await request
				.get("/atividades/1")
				.set("access_token", Token())
				.then((res) => {
					console.log(res.body)
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data).toHaveProperty("id");
					expect(res.body.data).toHaveProperty("ticket");
					expect(res.body.data).toHaveProperty("cliente");
					expect(res.body.data).toHaveProperty("técnico");
					expect(res.body.data).toHaveProperty("infos");
					expect(res.body.data.infos).toBeArray();
					if (res.body.data.infos.length > 0) {
						expect(res.body.data.infos[0]).toHaveProperty("id");
						expect(res.body.data.infos[0]).toHaveProperty("info_ticket");
						expect(res.body.data.infos[0]).toHaveProperty("descricao");
						expect(res.body.data.infos[0]).toHaveProperty("categoria");
					}
				});
		});
		it("Deve inserir uma nova atividade", async () => {
			return await request
				.post("/atividades")
				.send({
					cliente_id: 1,
					date: '2020-10-29'
				})
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(201);
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data).toHaveProperty("id");
					expect(res.body.data).toHaveProperty("cliente");
					expect(res.body.data).toHaveProperty("técnico");
					expect(res.body.data).toHaveProperty("infos");
					expect(res.body.data.infos).toBeArray();
					if (res.body.data.infos.length > 0) {
						expect(res.body.data.infos[0]).toHaveProperty("id");
						expect(res.body.data.infos[0]).toHaveProperty("descricao");
						expect(res.body.data.infos[0]).toHaveProperty("categoria");
					}
				})
		})
		it("Deve atualizar o cliente da atividade", async () => {
			return await request
				.put("/atividades/1")
				.send({
					id: 2,
					cliente_id: 2,
				})
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(204);
				})
		})
	});
	describe("Pesquisa uma atividade, passando parametros inválidos", () => {
		it("Deve receber um erro, pois ID atividade não existe", async () => {
			return await request
				.get("/atividades/99999")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Atividade não existe!");
				});
		});
		it("Deve receber um erro, pois o usuário não existe", async () => {
			return await request
				.get("/atividades/user/999999")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Usuário não existe!");
				});
		});
		it("Deve receber um erro, pois o cliente não existe", async () => {
			return await request
				.get("/atividades/cliente/99999")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", "Cliente não existe!");
				});
		});
		it("Deve deve receber um erros, pois está inserindo atividade fora do período de 15 dias.", async () => {
			return await request
				.post("/atividades")
				.send({
					cliente_id: 1,
					date: '2020-10-14'
				})
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", 'Não criar atividade com mais de 15 dias.')
				})
		})
		it("Deve deve receber um erros, pois está inserindo atividade fora do período de 15 dias.", async () => {
			return await request
				.post("/atividades")
				.send({
					cliente_id: 1,
					date: '2020-10-14'
				})
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("message", 'Não criar atividade com mais de 15 dias.')
				})
		})
	});
});
