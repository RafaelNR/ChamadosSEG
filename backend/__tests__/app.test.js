const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

test("Deve receber autorização", async () => {
	return await request
		.get("/home")
		.set("access_token", Token())
		.then((res) => {
			expect(res.status).toBe(200);
		});
});
