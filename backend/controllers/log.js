const Model = require("../models/log");
const Validation = require("../tools/validation/schemas");

module.exports = {
	Save: async (user_id, type, category, res) => {
		const Dados = new Promise((resolve, reject) => {
			const validadoDados = Validation.insertLog({
				user_id,
				type,
				category,
				error: handlingError(res),
			});

			resolve(validadoDados);
			reject(
				new Error({
					...err,
					type,
					category,
				})
			);
		});

		return await Dados.then(async (Dados) => {
			await Model.insert(Dados);
			return Dados;
		}).catch((err) => {
			console.log(err);
			return err;
		});
	},
};

const handlingError = (Response) => {
	if (!Response) return null;

	if (!Response.success && Response.error) {
		if (typeof Response.error === "object") {
			if (Response.error.validationError) {
				// Error de validação
				console.log(Response.error.error);
				return Response.error.error.details[0].message;
			} else {
				console.log(Response.error);
				return "Possível erro de código!";
			}
		} else {
			// Error simples, strings
			console.log(Response.error);
			return Response.error;
		}
	}

	return null;
};
