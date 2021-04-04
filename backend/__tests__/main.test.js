
const Users = require("./users.test");
const Login = require("./login.test");
const Clients = require("./clients.test");
const Categorias = require("./categorias.test");
const Atividades = require("./atividades.test");
const Infos_Atividades = require("./infos.test");
const Token = require("./token.test");

describe("sequentially run tests", () => {
	Token();
	Users();
	Login();
	Clients();
	Categorias();
	Atividades();
	Infos_Atividades();
});
