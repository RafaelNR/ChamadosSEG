const Controller = require("../../../backend/controllers/category");

const user_id = 1;
const Body = {
	id: 1,
	nome: "Firewall",
};

describe("Tools da categoria.", () => {
	it("handlerInsert >> Deve receber os dados da categoria tratados, pronto para insert.", () => {
		const newBody = {
			id: undefined,
			...Body,
		};
		const res = Controller.tools.handlerInsert(newBody, user_id);

		expect(res).toHaveProperty("nome", Body.nome);
		expect(res).toHaveProperty("user_id", user_id);
		expect(res).toHaveProperty("created_at");
		expect(res).toHaveProperty("updated_at");
	});

	it("handlerUpdate >> Deve receber os dados da categoria tratados, pronto para update.", () => {
		const res = Controller.tools.handlerUpdate(Body, user_id);

		expect(res.id).toBe(1);
		expect(res).toHaveProperty("nome", Body.nome);
		expect(res).toHaveProperty("user_id", user_id);
		expect(res).toHaveProperty("updated_at");
	});
});
