const App = require("../src/core/app");
const request = require("supertest")(App);
// const knexfile = require("../knexfile");
// const knex = require("knex")(knexfile.dev);

const MAIN_ROUTE = "/login";
let Token;

it("Deve receber o token do usuário", async () => {
	await request
		.post(MAIN_ROUTE)
		.send({
			user: "rafaelnetto",
			passwd: "batata15",
		})
		.then((res) => {
			expect(res.status).toBe(200); // Deve ser;
			expect(res.body).toHaveProperty("success", true);
			expect(res.body.data).toHaveProperty("auth", true);
			expect(res.body.data).toHaveProperty("token");
			expect(res.body.data).toHaveProperty("user_id");
			Token = res.body.data.token; // save o token;
		});
});

module.exports = {
	Token: () => Token
};
