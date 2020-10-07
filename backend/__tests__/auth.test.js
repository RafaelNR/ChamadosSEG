const App = require("../src/core/app");
const request = require("supertest")(App);
// const knexfile = require("../knexfile");
// const knex = require("knex")(knexfile.dev);

const MAIN_ROUTE = "/login";
let Token;

it("Deve receber o token so usuário", async () => {
	await request
		.post(MAIN_ROUTE)
		.send({
			user: "rafaelnetto",
			passwd: "batata15",
		})
		.then((res) => {
			expect(res.status).toBe(200); // Deve ser;
			expect(res.body).toHaveProperty("auth"); // deve possuir a propriedade data
			expect(res.body).toHaveProperty("token"); // deve possuir a propriedade data
			expect(res.body.auth).toBe(true); // deve auth é true
			expect(res.body.user).toHaveProperty("id");
			expect(res.body.user).toHaveProperty("user");
			expect(res.body.user).toHaveProperty("nome");
			Token = res.body.token; // save o token;
		});
});

module.exports = {
	Token: () => Token
};
