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

	clientsUser: (Dados) => validate(Dados, type.array.clients),

	/**
	 * Valida Dados para Insert de um user;
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
	 * Valida Dados para Update de um user;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	updateUser: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				nome: type.string.nome,
				passwd: type.string.passwd,
				email: type.string.email,
				telefone: type.string.telefone,
				role_id: type.number.role_id,
				actived: type.number.actived,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 * Valida Dados para Insert de um cliente;
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
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 * Valida Dados para Update de um cliente;
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
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 * Valida Dados para Insert de uma atividade;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	insertAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				user_id: type.number.id,
				cliente_id: type.number.id,
				atividades: type.array.atividades,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},
	/**
	 * Valida Dados para Update de um atividade;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	updateAtividades: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				user_id: type.number.id,
				cliente_id: type.number.id,
				atividades: type.array.atividades,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 * Valida Dados para Insert do log;
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
	 * Valida Dados para Isert de um categoria;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	insertCategoria: (Dados) => {
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
	 * Valida Dados para Update de um categoria;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	updateCategoria: (Dados) => {
		return validate(
			Dados,
			Joi.object({
				id: type.number.id,
				nome: type.string.nome,
				user_id: type.number.id,
				created_at: type.date.created_at,
				updated_at: type.date.updated_at,
			})
		);
	},

	/**
	 * Valida Dados para Update de um categoria;
	 * @param {Object} Dados
	 * @return {Object}
	 */
	InsertTask: (Dados) => {
		return Dados;
	},
};
