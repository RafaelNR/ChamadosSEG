const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token, TokenTecnico } = require("./auth.test");

describe("Testes Chamado, INSERT", () => {
  it("Deve inserir acompanhamento do chamado como administrador.", async () => {
    return await request
      .post("/chamados/acm")
      .set("access_token", Token())
      .send({
        chamado_id: 2,
        tipo: 1,
        descricao: "Acompanhamento 01 Descrição",
      })
      .then((res) => {
        console.log(res.body)
        expect(res.status).toBe(200); // Deve ser;
        expect(res.body).toHaveProperty("success", true);
      });
  });
  it("Deve inserir acompanhamento do chamado como técnico.", async () => {
    return await request
      .post("/chamados/acm")
      .set("access_token", TokenTecnico())
      .send({
        chamado_id: 2,
        tipo: 2,
        descricao: "Acompanhamento 02 Descrição",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.status).toBe(200); // Deve ser;
        expect(res.body).toHaveProperty("success", true);
      });
  });
  it("Deve receber um erro, pois estou adicionado acompanhamento onde não tenha permissão.", async () => {
    return await request
      .post("/chamados/acm")
      .set("access_token", TokenTecnico())
      .send({
        chamado_id: 1,
        tipo: 2,
        descricao: "Acompanhamento 02 Descrição",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.status).toBe(400); // Deve ser;
        expect(res.body).toHaveProperty("success", false);
        expect(res.body).toHaveProperty(
					"message",
					"Você não ter permissão para adicionar acompanhamento nesse chamado."
				);
      });
  });
})

describe("Testes Chamado, UPDATE", () => {
  it("Deve atualizar o acompanhamento do chamado como administrador.", async () => {
    return await request
      .put("/chamados/acm/1")
      .set("access_token", Token())
      .send({
        descricao: "Acompanhamento 01 Descrição",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.status).toBe(200); // Deve ser;
        expect(res.body).toHaveProperty("success", true);
      });
  });
  it("Deve atualizar o acompanhamento do chamado como técnico.", async () => {
    return await request
      .put("/chamados/acm/9")
      .set("access_token", TokenTecnico())
      .send({
        descricao: "Acompanhamento 01 Descrição",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.status).toBe(200); // Deve ser;
        expect(res.body).toHaveProperty("success", true);
      });
  });
  it("Deve receber um erro, pois está editando acompanhando que não é seu.", async () => {
		return await request
			.put("/chamados/acm/1")
			.set("access_token", TokenTecnico())
			.send({
				descricao: "Acompanhamento 01 Descrição",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(400); // Deve ser;
				expect(res.body).toHaveProperty("success", false);
				expect(res.body).toHaveProperty(
					"message",
					"Você não ter permissão editar esse acompanhamento."
				);
			});
	});
})