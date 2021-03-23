const App = require("../src/core/app");
const request = require("supertest")(App);

const MAIN_ROUTE = "/login";
//const { Token } = require("./auth.test");

test("Não deve autenticar com senha invalida", async () => {
	return await request
		.post(MAIN_ROUTE)
		.send({
			user: "rafaelnetto",
			passwd: "teste",
		})
		.then((res) => {
			console.log(res.body)
			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("message", 'Usuário ou Senha são inválidos.');
		});
});

test("Não deve autenticar com user invalido", async () => {
	return await request
		.post(MAIN_ROUTE)
		.send({
			user: "jose",
			passwd: "batata15",
		})
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("message", 'Usuário ou Senha são inválidos.');
		});
});

test("Não deve autenticar sem senha", async () => {
	return await request
		.post(MAIN_ROUTE)
		.send({
			user: "rafaelnetto",
		})
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("message", "\"passwd\" is required");
		});
});

test("Não deve autenticar sem user", async () => {
	return await request
		.post(MAIN_ROUTE)
		.send({
			passwd: "teste",
		})
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("message", "\"user\" is required");
		});
});
