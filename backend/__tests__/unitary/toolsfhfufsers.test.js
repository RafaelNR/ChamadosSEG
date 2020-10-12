const Controller = require("../../../backend/controllers/user");

const User = {
	id: 1,
	nome: "Usuário Nome 20",
	user: "user20",
	passwd: "user20",
	email: "user20@seg.eti.br",
	telefone: "32999999999",
	role_id: 1,
};

describe("Tools do usuário.", () => {
	it("handlingInsert >> Deve receber os dados do Usuário tratados, pronto para insert.", () => {
		delete User.id;
		const res = Controller.tools.handilingInsert(User);

		expect(res.userDados).toHaveProperty("nome", User.nome);
		expect(res.userDados).toHaveProperty("user", User.user);
		expect(res.userDados).toHaveProperty("passwd");
		expect(res.userDados.passwd).not.toBe(User.passwd);
		expect(res.userDados).toHaveProperty("email", User.email);
		expect(res.userDados).toHaveProperty("telefone", User.telefone);
		expect(res.userDados).toHaveProperty("role_id", User.role_id);
		expect(res.userDados).toHaveProperty("actived", 1);
		expect(res.userDados).toHaveProperty("created_at");
		expect(res.userDados).toHaveProperty("updated_at");
	});

	it("handlingUpdate >> Deve receber os dados do Usuário tratados, pronto para update.", () => {
		const res = Controller.tools.handilingInsert(User);

		expect(res.userDados).toHaveProperty("nome", User.nome);
		expect(res.userDados).toHaveProperty("user", User.user);
		expect(res.userDados).toHaveProperty("passwd");
		expect(res.userDados.passwd).not.toBe(User.passwd);
		expect(res.userDados).toHaveProperty("email", User.email);
		expect(res.userDados).toHaveProperty("telefone", User.telefone);
		expect(res.userDados).toHaveProperty("role_id", User.role_id);
		expect(res.userDados).toHaveProperty("actived");
		expect(res.userDados).toHaveProperty("created_at");
		expect(res.userDados).toHaveProperty("updated_at");
	});
});
