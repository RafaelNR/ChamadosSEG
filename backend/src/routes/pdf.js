const Router = require("express").Router();
const axios = require("axios").default;
const Model = require("../models/atividades");


Router.get("/atividade/:ticket", async (req, res) => {
  try {  
    const ticket = req.params.ticket;
    if(!ticket) throw new Error('ticket não existe.')

    if (Model.countAtividadeByTicket(ticket) <= 0) throw new Error('Ticket não existe.');

		const Dados = await axios.get(
			`http://localhost:3001/pdf/atividade/${ticket}`
		);

		if (Dados.data.success) {
			return res.status(200).json(Dados.data);
		}


		throw new Error("Erro em gerar PDF.");

	} catch (error) {
		return res.send(error);
	}
});

Router.get("/atividade", async (req, res) => {
  res.send('Ativ');
})


module.exports = Router;
