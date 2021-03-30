"use strict";

const { Joi, validate, type } = require("./index");


module.exports = {
	ID: (id) => validate(id, type.number.id),
	login: (Dados) =>
		validate(
			Dados,
			Joi.object({ user: type.string.user, passwd: type.string.passwd })
		),
	UserID: (User) => validate(User, type.number.id),
	ClientID: (Client) => validate(Client, type.number.id),
	Data: (Data) => validate(Data, type.string.date),
	DiaMesAno: (Data) => type.date.DiaMesAno(Data),
	status: (Status) => validate(Status, type.string.status),
	Ticket: (Ticket) => validate(Ticket, type.string.ticket), 
	clientsUser: (Dados) => validate(Dados, type.array.clients),
	subCategorias_array: (Dados) => validate(Dados, type.array.subCategorias),

	insertUser: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				nome: type.string.nome,
				user: type.string.user,
				passwd: type.string.passwd,
				email: type.string.email,
				telefone: type.string.telefone,
				role_id: type.number.role_id,
				actived: type.number.actived,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	updateUser: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				nome: type.string.nome,
				passwd:
					Dados.passwd === "******" ? type.string.default : type.string.passwd,
				email: type.string.email,
				telefone: type.string.telefone,
				role_id: type.number.role_id,
				actived: type.number.actived,
				updated_at: type.date.updated_at(),
			})
		);
	},

	insertClient: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				razao_social: type.string.razao_social,
				nome_fantasia: type.string.nome_fantasia,
				cnpj_cpf: type.string.cpnj_cpf,
				email: type.string.email,
				user_id: type.number.id,
				telefone: type.string.telefone,
				representante: type.string.representante,
				n_contrato: type.string.n_contrato,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	updateClient: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				razao_social: type.string.razao_social,
				nome_fantasia: type.string.nome_fantasia,
				cnpj_cpf: type.string.cpnj_cpf,
				email: type.string.email,
				user_id: type.number.id,
				telefone: type.string.telefone,
				representante: type.string.representante,
				n_contrato: type.string.n_contrato,
				updated_at: type.date.updated_at(),
			})
		);
	},

	insertAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				ticket: type.string.ticket,
				user_id: type.number.id,
				cliente_id: type.number.id,
				date: type.date.dateAtividade(Dados.date),
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	updateAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				cliente_id: type.number.id,
				updated_at: type.date.updated_at(),
			})
		);
	},

	insertInfoAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				info_ticket: type.string.info_ticket,
				descricao: type.string.default,
				categoria_id: type.number.id,
				atividade_id: type.number.id,
				user_id: type.number.id,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			}).options({ stripUnknown: true }) // remove as outras propriedades;
		);
	},

	updateInfoAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				descricao: type.string.default,
				categoria_id: type.number.id,
				user_id: type.number.id,
				updated_at: type.date.updated_at(),
			}).options({ stripUnknown: true }) // remove as outras propriedades;
		);
	},

	insertLog: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				user_id: type.number.id,
				type: type.string.categoria,
				category: type.string.categoria,
				error: type.string.error,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	insertCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				nome: type.string.categoria,
				user_id: type.number.id,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	updateCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				nome: type.string.categoria,
				user_id: type.number.id,
				updated_at: type.date.updated_at(),
			})
		);
	},

	insertSubCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				nome: type.string.nome,
				user_id: type.number.id,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	updateSubCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				nome: type.string.nome,
				user_id: type.number.id,
				updated_at: type.date.updated_at(),
			})
		);
	},

	InsertTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				cliente_id: type.number.id,
				owner_user_id: type.number.id,
				open_by_user_id: type.number.id,
				status: type.string.status,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	UpdateTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				cliente_id: type.number.id,
				owner_user_id: type.number.id,
				open_by_user_id: type.number.id,
				status: type.string.status,
				updated_at: type.date.updated_at(),
			})
		);
	},

	InsertAcmTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				task_id: type.number.id,
				user_id: type.number.id,
				type: type.string.status,
				descricao: type.string.default,
				created_at: type.date.created_at(),
				updated_at: type.date.updated_at(),
			})
		);
	},

	UpdateAcmTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				task_id: type.number.id,
				user_id: type.number.id,
				type: type.string.status,
				descricao: type.string.default,
				updated_at: type.date.updated_at(),
			})
		);
	},

	PDFAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				data_inicial: Joi.date().format("YYYY-MM-DD"),
				data_final: Joi.date().format("YYYY-MM-DD"),
				mes: Joi.number().integer().positive().min(1).max(12),
				ano: Joi.number().integer().positive().min(2000).max(2030),
				tecnico: Joi.number().integer().positive().min(1).max(999),
				cliente: Joi.number().integer().positive().min(1).max(99),
			})
		);
	},
	UploadImage: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				originalname: type.string.nome,
				encoding: type.string.telefone,
				mimetype: type.string.telefone,
				destination: type.string.nome,
				fieldname: type.string.nome,
				filename: type.string.nome,
				path: type.string.nome,
				size:	type.number.id
			})
		);
	}
};
