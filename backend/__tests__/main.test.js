
const Users = require("./users.test");
const Login = require("./login.test");
const Clients = require("./clients.test");
const Categorias = require("./categorias.test");
const Tasks = require("./tasks.test");
const Atividades = require("./atividades.test");
const Acm_Atividades = require("./acm_tasks.test");
const Token = require("./token.test");

describe("sequentially run tests", () => {
	Token();
	Users();
	Login();
	Clients();
	Categorias();
	Tasks();
	Atividades();
	Acm_Atividades();
});
