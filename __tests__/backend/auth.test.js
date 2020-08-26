const App = require("../../backend/core/app");
const request = require("supertest")(App);
const knexfile = require("../../knexfile.js");
const knex = require("knex")(knexfile.development);

const MAIN_ROUTE = "/login";
let Token;

// beforeAll((done) => {
// 	request
// 		.post(MAIN_ROUTE)
// 		.send({
// 			user: "rafaelnetto",
// 			passwd: "batata15",
// 		})
// 		.end((err, res) => {
// 			expect(res.status).toBe(200); // Deve ser;
// 			expect(res.body).toHaveProperty("auth"); // deve possuir a propriedade data
// 			expect(res.body).toHaveProperty("token"); // deve possuir a propriedade data
// 			expect(res.body.auth).toBe(true); // deve auth é true
// 			expect(res.body.user).toHaveProperty("id");
// 			expect(res.body.user).toHaveProperty("user");
// 			expect(res.body.user).toHaveProperty("nome");
// 			Token = res.body.token; // save o token;
// 			console.log(Token);
// 			done();
// 		});
// });

it("Deve testar conexão com o banco de dados", async () => {
	await knex
		.select("id")
		.from("users")
		.limit(1)
		.then((User) => {
			if (User) {
				expect(User[0].id).toBe(1);
			} else {
				console.log("Erro em se Conectar com o Banco de Dados");
			}
		});
});

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
	Token: () => {
		return Token;
	},
};
