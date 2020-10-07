const Auth = require('./auth.test')
const Users = require("./users.test");
const Login = require("./login.test");
const Clients = require("./clients.test");
const Categorias = require("./categorias.test");
const Tasks = require("./tasks.test");
const Atividades = require("./atividades.test");
const Acm_Atividades = require("./acm_tasks.test");

describe("sequentially run tests", () => {
	Auth();
	Users();
	Login();
	Clients();
	Categorias();
	Tasks();
	Atividades();
	Acm_Atividades();
});
