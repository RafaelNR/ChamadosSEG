const App = require("../src/core/app");
const request = require("supertest")(App);

const { Token } = require("./auth.test");

describe("Informações de atividades", () => {
	describe("Sem erros", () => {
    it("Deve inserir uma nova informação pata atividade", async () => {
			return await request
				.post("/atividades/infos")
				.send({
					descricao: 'Fiz mais uma tal coisa',
          categoria_id: 2,
          atividade_id: 2
				})
				.set("access_token", Token())
				.then((res) => {
          expect(res.status).toBe(201);
          expect(res.body.data).toHaveProperty('descricao');
          expect(res.body.data).toHaveProperty('categoria');
          expect(res.body.data).toHaveProperty('user');
          expect(res.body.data).toHaveProperty('created_at');
          expect(res.body.data).toHaveProperty('updated_at');
				})
    })
    it("Deve fazer o update da informação da atividade", async () => {
			return await request
				.put("/atividades/infos/1")
				.send({
          id: 1,
					descricao: 'Fiz mais uma tal teste teste teste',
          categoria_id: 2,
				})
				.set("access_token", Token())
				.then((res) => {
          console.log(res.body)
					expect(res.status).toBe(204);
				})
		})
  })
  describe("Sem erros", () => {
    it("Deve receber um erro, poís atividade não existe.", async () => {
			return await request
				.post("/atividades/infos")
				.send({
					descricao: 'Fiz mais uma tal coisa',
          categoria_id: 2,
          atividade_id: 9999
				})
				.set("access_token", Token())
				.then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty('success', false);
          expect(res.body).toHaveProperty('message', 'Atividade não existe, informação não inserida.')
				})
    })
  })
});