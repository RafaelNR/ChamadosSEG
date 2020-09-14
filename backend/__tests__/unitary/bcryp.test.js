const Bcryp = require("../../../backend/tools/bcryp");

const passwd = "rafael123";
let passwdDB = "";

it("Crypt >> Devo receber a senha do usuário criptografada", () => {
	passwdDB = Bcryp.Crypt(passwd);

	console.log(passwdDB);

	expect(passwdDB).not.toBeUndefined();
	expect(passwdDB).not.toBe(passwd);
});

it("Crypt >> Compara a senha passada com a do banco", () => {
	const senha = Bcryp.Compare(passwd, passwdDB);

	expect(senha).not.toBeUndefined();
	expect(senha).toBe(true);
});
