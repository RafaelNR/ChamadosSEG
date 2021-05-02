const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Testes recuperar a senha.", () => {

  it("Deve receber sucesso.", async () => {
    return await request
      .post("/recuperar-senha?email=rafael.rodrigues@seg.eti.br")
      .set("access_token", Token())
      .then((res) => {
        console.log(res.body.data)
      });
  });

  // it("Deve receber um erro, poís email não foi preenchido.", async () => {
  //   return await request
  //     .post("/recuperar-senha?email=")
  //     .set("access_token", Token())
  //     .then((res) => {
  //       expect(res.status).toBe(400);
  //       expect(res.body).toHaveProperty("success", false);
  //       expect(res.body).toHaveProperty(
	// 				"message",
	// 				"Campo email não foi preenchido."
	// 			);
  //     });
  // });
  
  // it("Deve receber um erro, poís email não existe.", async () => {
  //   return await request
	// 		.post("/recuperar-senha?email=rafael.r@seg.eti.br")
	// 		.set("access_token", Token())
	// 		.then((res) => {
  //       expect(res.status).toBe(400);
  //       expect(res.body).toHaveProperty("success", false);
  //       expect(res.body).toHaveProperty(
	// 				"message",
	// 				"Email não foi encontrado."
	// 			);
	// 		});
  // });

  // it("Deve receber um erro, poís só pode fazer uma solicitação por dia.", async () => {
  //   return await request
  //     .post("/recuperar-senha?email=rafael.rodrigues@seg.eti.br")
  //     .set("access_token", Token())
  //     .then((res) => {
  //       expect(res.status).toBe(400);
  //       expect(res.body).toHaveProperty("success", false);
  //       expect(res.body).toHaveProperty(
	// 				"message",
	// 				"Você só pode fazer uma solicitação por dia."
	// 			);
  //     });
  // });


})