const App = require("../src/core/app");
const request = require("supertest")(App);

const MAIN_ROUTE = "/auth";

it("Deve receber um erro quando token não é passado ou menor que 10 caracteres.", async () => {
	await request
		.get(MAIN_ROUTE)
    .set("access_token", '')
		.then((res) => {
      expect(res.status).toBe(401); // Deve ser;
      expect(res.body).toHaveProperty("success", false); 
			expect(res.body).toHaveProperty("auth", false); 
      expect(res.body).toHaveProperty("token", null); 
      expect(res.body.message).toBe("Precisa efetuar o login para acessar a página.");
		});
});


it("Deve receber um erro quando token é passado porém inválido", async () => {
	await request
		.get(MAIN_ROUTE)
    .set("access_token", '5659f78f7f8f7f8f5f8f98f7f8f4f5')
		.then((res) => {
      expect(res.status).toBe(401); // Deve ser;
      expect(res.body).toHaveProperty("success", false); 
			expect(res.body).toHaveProperty("auth", false); 
      expect(res.body).toHaveProperty("token", null); 
      expect(res.body.message).toBe("Autenticação expirou ou não é mais valida.");
		});
});

