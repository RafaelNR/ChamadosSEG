const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const moment = require('moment');

const type = {
	number: {
		id: Joi.number().integer().positive().required(),
		role_id: Joi.number().integer().min(1).max(10).required(),
		ano: Joi.number().integer().positive().min(2000).max(2030).required(),
		mes: Joi.number().integer().positive().min(1).max(12).required(),
		dia: Joi.number().integer().positive().min(1).max(31).required(),
		actived: Joi.number().integer().default(1),
		prioridade: Joi.number().integer().positive().min(0).max(1),
		status: Joi.number().integer().positive().min(0).max(10),
		default: Joi.number().integer().positive().min(0).max(9999),
		defaultRequired: Joi.number().integer().positive().min(0).max(9999),
	},
	string: {
		nome: Joi.string().min(3).max(254).required(),
		razao_social: Joi.string().min(10).max(254).required(),
		nome_fantasia: Joi.string().min(3).max(150).required(),
		cpnj_cpf: Joi.string().min(14).max(18).required(),
		user: Joi.string().lowercase().min(3).max(30).required(),
		passwd: Joi.string().min(8).max(30).required(),
		telefone: Joi.string().min(3).max(15).required(),
		numero: Joi.string().min(9).max(9).required(),
		email: Joi.string().email().required(),
		categoria: Joi.string().min(3).max(100).required(),
		date: Joi.string().min(10).max(10).required(),
		status: Joi.string().lowercase().min(3).max(50).required(),
		methodHTTP: Joi.string().min(3).max(10).required(),
		error: [Joi.string().optional(), Joi.allow(null)],
		ticket: Joi.string().min(10).max(14),
		info_ticket: Joi.string().min(10).max(16),
		representante: Joi.string().min(3).max(100).required(),
		n_contrato: Joi.string().min(3).max(15).required(),
		default: Joi.string(),
		defaultRequired: Joi.string().required(),
	},
	date: {
		last_access: () => moment().locale("pt-br").format("YYYY-MM-DD HH:mm:ss"),
		created_at: () => Joi.date().default(moment().locale("pt-br").format("YYYY-MM-DD HH:mm:ss")),
		updated_at: () => Joi.date().default(moment().locale("pt-br").format("YYYY-MM-DD HH:mm:ss")),
		dateAtividade: (Date) =>
			moment(Date).locale("pt-br").format("YYYY-MM-DD"),
		DiaMesAno: (Date) => checkDateIsExist(Date),
		default: Joi.date().format("YYYY-MM-DD HH:mm:ss"),
	},
	array: {
		clients: Joi.array()
			.min(1)
			.max(99)
			.items(Joi.number().integer().min(0).max(999).required())
			.required(),
		subCategorias: Joi.array()
			.min(1)
			.max(99)
			.items(Joi.number().integer().min(0).max(999).required())
			.required(),
		atividades: Joi.array()
			.min(1)
			.max(99)
			.items(
				Joi.object({
					categoria: Joi.string().min(3).max(100).required(),
					descricao: Joi.string().required(),
				})
			)
			.required(),
		arrays: Joi.array().unique().min(1).max(3).items(Joi.number()).required(),
		default: Joi.array().required(),
	},
};

const validate = (Valores, Schema) => {
	const { error, value } = Schema.validate(Valores, {
		abortEarly: false,
		stripUnknown: false,
	});

	if (error) throw { success: false, validationError: true, error: error };

	return value;
};

/**
 * Verifica se valores das dados estão corretos.
 */
const checkDateIsExist = (Date) => {
	validate(Date, type.date.default);
	const newDate = Date.split("-");
	validate(parseInt(newDate[0]), type.number.ano);
	validate(parseInt(newDate[1]), type.number.mes);
	validate(parseInt(newDate[2]), type.number.dia);
	return Date;
};

module.exports = {
	Joi,
	type,
	validate,
};
