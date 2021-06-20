const Model = require("../models/acm_chamados");
const { countID: isExitChamado, findOne, update: ChamadoUpdate } = require("../models/chamados");
const { getRole } = require("../models/user");
const { countClientByUser } = require("../models/clients_has_users");
const Validate = require("../tools/validation/schemas");
const Result = require("../tools/result");

const findAcompanhamentosByChamado = async (req, res) => {
  try {
    if (!req.params.chamado_id) throw 'Parâmetros não encontrado.';

    const chamado_id = Validate.ID(req.params.chamado_id);

		await tools.checkChamadoIsExist(chamado_id);
		
		await tools.verifyPermissionAccess(req.userId, chamado_id);

		const acm = await Model.findOneByChamadoID(chamado_id);
		Result.ok(200, acm);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "acm_chamados", "findOneAcmsChamado");
	return res.status(Result.status).json(Result.res);
};

const CountTypeAcompanhamentos = async (req, res) => {
	try {
		const acms = await Model.CountTypeAcompanhamentos();
		Result.ok(200,acms[0]);
	} catch (error) {
		Result.fail(400, error);
	}

	return res.status(Result.status).json(Result.res);
};

const insert = async (req,res) => {
	try {
    if (!req.body || !req.body.chamado_id) throw "Dados não encontrados.";

		const Dados = await tools.handleInsert({
			...req.body,
			user_id: req.userId,
		});

		const acm = await Model.findOne(await Model.insert(Dados));

		// Muda status chamado;
		const Chamado = await findOne(acm.chamado_id);
		if (Chamado.atribuido_id === req.userId && Chamado.status === 'Aberto') {
			await ChamadoUpdate({ id: acm.chamado_id, status: "Em Andamento" });
		}

		Result.ok(200, acm);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "acm_chamados", "insert");
	return res.status(Result.status).json(Result.res);
}

const update = async (req,res) => {
	try {
    if (!req.body || !req.params.id) throw "Dados não encontrados.";

		const Dados = await tools.handleUpdate({
			...req.body,
			id: req.params.id,
			user_id: req.userId
		})

		await Model.update(Dados);
	
		Result.ok(200, Dados);
	} catch (error) {
		Result.fail(400, error);
	}

	Result.registerLog(req.userId, "acm_chamados", "insert");
	return res.status(Result.status).json(Result.res);
}

const tools = {
	handleInsert: async (Dados) => {
		const newDados = Validate.InsertAcmChamados(Dados);
		await tools.verifyPermissionAccess(newDados.user_id, newDados.chamado_id);
		return newDados;
	},
	handleUpdate: async (Dados) => {
		const newDados = Validate.UpdateAcmChamados(Dados);

		const { user_id } = await Model.findOne(Dados.id);
		const role_id = await tools.getPermissionUserID(Dados.user_id);

		if (role_id !== 3) return newDados;
		
		if (user_id === Dados.user_id) return newDados;

		throw 'Você não ter permissão editar esse acompanhamento.';

	},
	checkChamadoIsExist: async (chamado_id) => {
		const chamado = await isExitChamado(chamado_id);
		if (chamado <= 0) throw "Chamado não existe.";
		return true;
	},
	getPermissionUserID: async (user_id) => {
		return await getRole(user_id);
	},
	verifyPermissionAccess: async (user_id, chamado_id) => {

		const role_id = await tools.getPermissionUserID(user_id);

		if (role_id === 1 || role_id === 2) return true;

		const Dados = await findOne(chamado_id);

		if (user_id === Dados.requerente_id)
			return true;
		else if (user_id === Dados.tecnico_id)
			return true;
		else if (await countClientByUser(user_id, Dados.cliente_id))
			return true;
		else
			throw 'Você não ter permissão para adicionar acompanhamento nesse chamado.'

	},
};

module.exports = {
	findAcompanhamentosByChamado,
	CountTypeAcompanhamentos,
	update,
	insert,
};