require("dotenv/config");
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
			expect(res.body.data.user).toHaveProperty("user", 'rafaelnetto');
			expect(res.body.data.user).toHaveProperty("actived", 1);
			expect(res.body.data.user).toHaveProperty("telefone");
			expect(res.body.data.user).toHaveProperty("role_id");
			expect(res.body.data.user).toHaveProperty("nome");
			expect(res.body.data.user).toHaveProperty("last_acess");
			expect(res.body.data.user).toHaveProperty("email");
			expect(res.body.data.user).toHaveProperty("created_at");
			Token = res.body.data.token; // save o token;
		});
});

module.exports = {
	Token: () => Token
};
