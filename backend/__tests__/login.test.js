const App = require("../src/core/app");
const request = require("supertest")(App);

const MAIN_ROUTE = "/login";
const { Token } = require("./auth.test");

test("Verifica se token ainda é valido", async () => {
	return await request
		.post(MAIN_ROUTE)
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(200); // Deve ser;
			expect(res.body).toHaveProperty("auth"); // deve possuir a propriedade data
			expect(res.body.auth).toBe(true); // deve auth é true
		});
});

test("Não deve autenticar com senha invalida", async () => {
	return await request
		.post(MAIN_ROUTE)
		.send({
			user: "rafaelnetto",
			passwd: "teste",
		})
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("auth", false);
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
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("auth", false);
		});
});

test("Não deve autenticar sem senha", async () => {
	return await request
		.post(MAIN_ROUTE)
		.send({
			user: "rafaelnetto",
		})
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("auth", false);
		});
});

test("Não deve autenticar sem user", async () => {
	return await request
		.post(MAIN_ROUTE)
		.send({
			passwd: "teste",
		})
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("auth", false);
		});
});

test("Não devo autenticar sem senha", async () => {
	return await request
		.post(MAIN_ROUTE)
		.set("access_token", "")
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("success", false);
			expect(res.body).toHaveProperty("auth", false);
		});
});
