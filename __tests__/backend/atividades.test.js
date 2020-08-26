const App = require("../../backend/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes de Ativides", () => {
	describe("Pesquisa uma atividade, sem erro", () => {
		test("Deve receber todas as atividades", async () => {
			return await request
				.get("/atividades")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("nome_fantasia");
					expect(res.body.data[0]).toHaveProperty("técnico");
				});
		});
		test("Deve receber todas atividades do meu userID", async () => {
			return await request
				.get("/atividades/user")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("nome_fantasia");
					expect(res.body.data[0]).toHaveProperty("técnico");
				});
		});
		test("Deve receber todas atividades do meu cliente", async () => {
			return await request
				.get("/atividades/client/1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data[0]).toHaveProperty("id");
					expect(res.body.data[0]).toHaveProperty("nome_fantasia");
					expect(res.body.data[0]).toHaveProperty("técnico");
				});
		});
		test("Deve receber atividade que existe pelo ID dela", async () => {
			return await request
				.get("/atividades/1")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data).toHaveProperty("id");
					expect(res.body.data).toHaveProperty("nome_fantasia");
					expect(res.body.data).toHaveProperty("técnico");
					expect(res.body.data).toHaveProperty("atividades");
					expect(res.body.data.atividades).not.toBeNull();
					expect(res.body.data.atividades).not.toBeUndefined();
				});
		});
		test("Deve receber atividade que existe, user and data", async () => {
			return await request
				.get("/atividades/user/1/2020-08-06")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data).toHaveProperty("id");
					expect(res.body.data).toHaveProperty("nome_fantasia");
					expect(res.body.data).toHaveProperty("técnico");
					expect(res.body.data).toHaveProperty("atividades");
					expect(res.body.data.atividades).not.toBeNull();
					expect(res.body.data.atividades).not.toBeUndefined();
				});
		});
		test("Deve receber atividade que existe, client and data", async () => {
			return await request
				.get("/atividades/client/1/2020-08-06")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(200); // Deve ser;
					expect(res.body).toHaveProperty("success", true);
					expect(res.body).toHaveProperty("data");
					expect(res.body.data).toHaveProperty("id");
					expect(res.body.data).toHaveProperty("nome_fantasia");
					expect(res.body.data).toHaveProperty("técnico");
					expect(res.body.data).toHaveProperty("atividades");
					expect(res.body.data.atividades).not.toBeNull();
					expect(res.body.data.atividades).not.toBeUndefined();
				});
		});
	});

	describe("Pesquisa uma atividade, passando parametros inválidos", () => {
		it("Deve receber um erro, pois ID atividade não existe", async () => {
			return await request
				.get("/atividades/99999")
				.set("access_token", Token())
				.then((res) => {
					console.log(res.body);
					expect(res.status).toBe(401); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
		it("Deve receber um erro pois userID atividade não existe", async () => {
			return await request
				.get("/atividades/user/999999/2020-08-07")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
		test("Deve receber um erro pois data da atividade é invalida", async () => {
			return await request
				.get("/atividades/user/1/9999-99-99")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
		test("Deve receber um erro pois o usuário e a da são invalidos atividade não existe", async () => {
			return await request
				.get("/atividades/user/999999/9999-99-99")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
		test("Deve receber um erro pois cliente atividade não existe", async () => {
			return await request
				.get("/atividades/client/999999/2020-08-07")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
		test("Deve receber um erro pois a data é invalida atividade não existe", async () => {
			return await request
				.get("/atividades/client/1/9999-99-99")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
		test("Deve receber um erro pois o usuário e data da atividade são invalidos", async () => {
			return await request
				.get("/atividades/client/999999/9999-99-99")
				.set("access_token", Token())
				.then((res) => {
					expect(res.status).toBe(401); // Deve ser;
					expect(res.body).toHaveProperty("success", false);
					expect(res.body).toHaveProperty("error");
				});
		});
	});
});
