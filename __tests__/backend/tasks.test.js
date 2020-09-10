const App = require("../../backend/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes de Tasks", () => {
	it("Deve receber todas as tasks cadastradas", async () => {
		return await request
			.get("/tarefas")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");

				if (res.body.data.length > 0) {
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("cliente_nome");
					expect(res.body.data[0]).toHaveProperty("cliente_email");
					expect(res.body.data[0]).toHaveProperty("proprietario_id");
					expect(res.body.data[0]).toHaveProperty("proprietario_nome");
					expect(res.body.data[0]).toHaveProperty("proprietario_email");
					expect(res.body.data[0]).toHaveProperty("user_id");
					expect(res.body.data[0]).toHaveProperty("user_nome");
					expect(res.body.data[0]).toHaveProperty("user_email");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				}
			});
	});
	it("Deve receber todas tasks do meu userID", async () => {
		return await request
			.get("/tarefas/user")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");

				if (res.body.data.length > 0) {
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("cliente_nome");
					expect(res.body.data[0]).toHaveProperty("cliente_email");
					expect(res.body.data[0]).toHaveProperty("proprietario_id");
					expect(res.body.data[0]).toHaveProperty("proprietario_nome");
					expect(res.body.data[0]).toHaveProperty("proprietario_email");
					expect(res.body.data[0]).toHaveProperty("user_id");
					expect(res.body.data[0]).toHaveProperty("user_nome");
					expect(res.body.data[0]).toHaveProperty("user_email");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				}
			});
	});
	it("Deve receber todas tasks de um cliente que esteja relacionado ao meu userID.", async () => {
		return await request
			.get("/tarefas/cliente/1")
			.set("access_token", Token())
			.then((res) => {
				if (res.body.data.length > 0) {
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("status");
					expect(res.body.data[0]).toHaveProperty("cliente_id");
					expect(res.body.data[0]).toHaveProperty("cliente_nome");
					expect(res.body.data[0]).toHaveProperty("cliente_email");
					expect(res.body.data[0]).toHaveProperty("proprietario_id");
					expect(res.body.data[0]).toHaveProperty("proprietario_nome");
					expect(res.body.data[0]).toHaveProperty("proprietario_email");
					expect(res.body.data[0]).toHaveProperty("user_id");
					expect(res.body.data[0]).toHaveProperty("user_nome");
					expect(res.body.data[0]).toHaveProperty("user_email");
					expect(res.body.data[0]).toHaveProperty("created_at");
					expect(res.body.data[0]).toHaveProperty("updated_at");
				}
			});
	});
	it("Deve receber uma task pelo ID", async () => {
		return await request
			.get("/tarefas/1")
			.set("access_token", Token())
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
				expect(res.body).toHaveProperty("data");
				if (res.body.data) {
					expect(res.body.data).toHaveProperty("id");
					expect(res.body.data).toHaveProperty("cliente_id");
					expect(res.body.data).toHaveProperty("status");
					expect(res.body.data).toHaveProperty("cliente_nome");
					expect(res.body.data).toHaveProperty("cliente_email");
					expect(res.body.data).toHaveProperty("proprietario_id");
					expect(res.body.data).toHaveProperty("proprietario_nome");
					expect(res.body.data).toHaveProperty("proprietario_email");
					expect(res.body.data).toHaveProperty("user_id");
					expect(res.body.data).toHaveProperty("user_nome");
					expect(res.body.data).toHaveProperty("user_email");
					expect(res.body.data).toHaveProperty("created_at");
					expect(res.body.data).toHaveProperty("updated_at");
				}
			});
	});
	it("Deve alterar o proprietário da task", async () => {
		return await request
			.put("/tarefas/1/owner/")
			.set("access_token", Token())
			.send({
				id: 1,
				owner_id: 2,
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve alterar o status da task", async () => {
		return await request
			.put("/tarefas/1/status/")
			.set("access_token", Token())
			.send({
				id: 1,
				status: "Fechado",
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve inserir uma nova task", async () => {
		return await request
			.post("/tarefas")
			.set("access_token", Token())
			.send({
				owner_user_id: 1,
				open_by_user_id: 1,
				cliente_id: 1,
			})
			.then((res) => {
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	it("Deve alterar dados de um tasks", async () => {
		return await request
			.put("/tarefas/1")
			.set("access_token", Token())
			.send({
				id: 1,
				owner_user_id: 1,
				open_by_user_id: 1,
				cliente_id: 1,
				status: "Tratativa",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(200); // Deve ser;
				expect(res.body).toHaveProperty("success", true);
			});
	});
	// describe("Pesquisa uma atividade, passando parametros inválidos", () => {
	// 	it("Deve receber um erro, pois ID atividade não existe", async () => {
	// 		return await request
	// 			.get("/atividades/99999")
	// 			.set("access_token", Token())
	// 			.then((res) => {
	// 				console.log(res.body);
	// 				expect(res.status).toBe(401); // Deve ser;
	// 				expect(res.body).toHaveProperty("success", false);
	// 				expect(res.body).toHaveProperty("error");
	// 			});
	// 	});
	// 	it("Deve receber um erro pois userID atividade não existe", async () => {
	// 		return await request
	// 			.get("/atividades/user/999999/2020-08-07")
	// 			.set("access_token", Token())
	// 			.then((res) => {
	// 				expect(res.status).toBe(401); // Deve ser;
	// 				expect(res.body).toHaveProperty("success", false);
	// 				expect(res.body).toHaveProperty("error");
	// 			});
	// 	});
	// 	test("Deve receber um erro pois data da atividade é invalida", async () => {
	// 		return await request
	// 			.get("/atividades/user/1/9999-99-99")
	// 			.set("access_token", Token())
	// 			.then((res) => {
	// 				expect(res.status).toBe(401); // Deve ser;
	// 				expect(res.body).toHaveProperty("success", false);
	// 				expect(res.body).toHaveProperty("error");
	// 			});
	// 	});
	// 	test("Deve receber um erro pois o usuário e a da são invalidos atividade não existe", async () => {
	// 		return await request
	// 			.get("/atividades/user/999999/9999-99-99")
	// 			.set("access_token", Token())
	// 			.then((res) => {
	// 				expect(res.status).toBe(401); // Deve ser;
	// 				expect(res.body).toHaveProperty("success", false);
	// 				expect(res.body).toHaveProperty("error");
	// 			});
	// 	});
	// 	test("Deve receber um erro pois cliente atividade não existe", async () => {
	// 		return await request
	// 			.get("/atividades/client/999999/2020-08-07")
	// 			.set("access_token", Token())
	// 			.then((res) => {
	// 				expect(res.status).toBe(401); // Deve ser;
	// 				expect(res.body).toHaveProperty("success", false);
	// 				expect(res.body).toHaveProperty("error");
	// 			});
	// 	});
	// 	test("Deve receber um erro pois a data é invalida atividade não existe", async () => {
	// 		return await request
	// 			.get("/atividades/client/1/9999-99-99")
	// 			.set("access_token", Token())
	// 			.then((res) => {
	// 				expect(res.status).toBe(401); // Deve ser;
	// 				expect(res.body).toHaveProperty("success", false);
	// 				expect(res.body).toHaveProperty("error");
	// 			});
	// 	});
	// 	test("Deve receber um erro pois o usuário e data da atividade são invalidos", async () => {
	// 		return await request
	// 			.get("/atividades/client/999999/9999-99-99")
	// 			.set("access_token", Token())
	// 			.then((res) => {
	// 				expect(res.status).toBe(401); // Deve ser;
	// 				expect(res.body).toHaveProperty("success", false);
	// 				expect(res.body).toHaveProperty("error");
	// 			});
	// 	});
});
