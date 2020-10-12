const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

it("Deve verificar se a api está online", async () => {
	return await request
		.get("/")
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('message', 'API backend Online!');
		});
});

it("Deve erro, pois página não existe", async () => {
	return await request
		.get("/home")
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(404);
			expect(res.body).toHaveProperty('message', 'Página não existe /home');
		});
});

it("Deve fazer o logout", async () => {
	return await request
		.get("/logout")
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('auth', false);
			expect(res.body).toHaveProperty('token', null);
		});
});