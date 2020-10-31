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

	clientsUser: (Dados) => validate(Dados, type.array.clients),
	subCategorias_array: (Dados) => validate(Dados, type.array.subCategorias),

	/**
	 *& Valida Dados para Insert de um user;
	 * @param {Object} Dados
	 * @return {Object}
	 */
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
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Update de um user;
	 * @param {Object} Dados
	 * @return {Object}
	 */
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
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Insert de um cliente;
	 * @param {Object} Dados
	 * @return {Object}
	 */
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
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Update de um cliente;
	 * @param {Object} Dados
	 * @return {Object}
	 */
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
				updated_at: type.date.updated_at,
			})
		);
	},
	insertAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				user_id: type.number.id,
				cliente_id: type.number.id,
				date: type.date.default,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	updateAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				cliente_id: type.number.id,
				updated_at: type.date.updated_at,
			})
		);
	},

	insertInfoAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				descricao: type.string.default,
				categoria_id: type.number.id,
				atividade_id: type.number.id,
				user_id: type.number.id,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
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
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Insert do log;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	insertLog: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				user_id: type.number.id,
				type: type.string.categoria,
				category: type.string.categoria,
				error: type.string.error,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Insert de um categoria;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	insertCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				nome: type.string.categoria,
				user_id: type.number.id,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Update de um categoria;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	updateCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				nome: type.string.categoria,
				user_id: type.number.id,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para insert de um Sub-Categoria
	 % @param {Object} Dados
	 % @return {Object}
	 */
	insertSubCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				nome: type.string.nome,
				user_id: type.number.id,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Update de um Sub-Categoria;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	updateSubCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				nome: type.string.nome,
				user_id: type.number.id,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Insert de um tasks
	 * @param {Object} Dados
	 * @return {Object}
	 */
	InsertTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				cliente_id: type.number.id,
				owner_user_id: type.number.id,
				open_by_user_id: type.number.id,
				status: type.string.status,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Update de um tasks
	 * @param {Object} Dados
	 * @return {Object}
	 */
	UpdateTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				cliente_id: type.number.id,
				owner_user_id: type.number.id,
				open_by_user_id: type.number.id,
				status: type.string.status,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Insert de um acompanhamento da tasks
	 * @param {Object} Dados
	 * @return {Object}
	 */
	InsertAcmTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				task_id: type.number.id,
				user_id: type.number.id,
				type: type.string.status,
				descricao: type.string.default,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 *& Valida Dados para Update de um acompanhamento da tasks
	 * @param {Object} Dados
	 * @return {Object}
	 */
	UpdateAcmTask: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				task_id: type.number.id,
				user_id: type.number.id,
				type: type.string.status,
				descricao: type.string.default,
				updated_at: type.date.updated_at,
			})
		);
	},
};
