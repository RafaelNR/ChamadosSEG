require("dotenv/config");
const App = require("../src/core/app");
const request = require("supertest")(App);
// const knexfile = require("../knexfile");
// const knex = require("knex")(knexfile.dev);

const MAIN_ROUTE = "/login";
let TokenAdmin;
let TokenTecnico;


it("Deve logar como admin e receber o token", async () => {
	TokenAdmin = await request
		.post(MAIN_ROUTE)
		.send({
			user: "rafaelnetto",
			passwd: "batata15",
			permanecer: true,
		})
		.then((res) => {
			expect(res.status).toBe(200); // Deve ser;
			expect(res.body).toHaveProperty("success", true);
			expect(res.body.data).toHaveProperty("auth", true);
			expect(res.body.data).toHaveProperty("token");
			expect(res.body.data.user).toHaveProperty("user", "rafaelnetto");
			expect(res.body.data.user).toHaveProperty("actived", 1);
			expect(res.body.data.user).toHaveProperty("telefone");
			expect(res.body.data.user).toHaveProperty("role_id");
			expect(res.body.data.user).toHaveProperty("nome");
			expect(res.body.data.user).toHaveProperty("last_acess");
			expect(res.body.data.user).toHaveProperty("email");
			expect(res.body.data.user).toHaveProperty("created_at");
			return res.body.data.token; // save o token;
		});
});

it("Deve logar como técnico e receber o token", async () => {
	TokenTecnico = await request
		.post(MAIN_ROUTE)
		.send({
			user: "tecnico",
			passwd: "batata15",
			permanecer: true,
		})
		.then((res) => {
			expect(res.status).toBe(200); // Deve ser;
			expect(res.body).toHaveProperty("success", true);
			expect(res.body.data).toHaveProperty("auth", true);
			expect(res.body.data).toHaveProperty("token");
			expect(res.body.data.user).toHaveProperty("user", "tecnico");
			expect(res.body.data.user).toHaveProperty("actived", 1);
			expect(res.body.data.user).toHaveProperty("telefone");
			expect(res.body.data.user).toHaveProperty("role_id");
			expect(res.body.data.user).toHaveProperty("nome");
			expect(res.body.data.user).toHaveProperty("last_acess");
			expect(res.body.data.user).toHaveProperty("email");
			expect(res.body.data.user).toHaveProperty("created_at");
			return res.body.data.token; // save o token;
		});
});

module.exports = {
	Token: () => TokenAdmin,
	TokenTecnico: () => TokenTecnico,
};
