
const { lastTicket, lastInfoTicket } = require("../models/ticket");

class createTicket {
	constructor() {
		this.number = 0;
		this.numberInfo = 0;
		this.prefixo = ".";
	}

	async getNumber() {
		const ticket = await lastTicket();
		const prefixo = parseInt(ticket[0][0].ticket.split(".")[0]);
		return prefixo + 1;
	}

  async getNumberInfo(atividade_id) {
    const ticket = await lastInfoTicket(atividade_id);
    if (ticket[0][0]) {
      const prefixo = parseInt(ticket[0][0].info_ticket.split(".")[0]);
      return prefixo + 1;
    } else {
      return 1;
    }
	}

	getData() {
		const date = new Date();
		const Ano = date.getFullYear();
		const Mes = date.getMonth() + 1;
		const Day =
			date.getDate() > 0 && date.getDate() <= 9
				? `0${date.getDate()}`
				: date.getDate();

		return `${Ano}` + `${Mes}` + `${Day}`;
  }
  
  handleTicket(ticket) {
    return `${ticket}`.split(".")[0];
  }

	async created() {
		return (await this.getNumber()) + this.prefixo + this.getData();
	}

	async createdInfo(atividade_ticket, atividade_id) {
		return (
			(await this.getNumberInfo(atividade_id)) +
			this.prefixo +
			this.handleTicket(atividade_ticket) +
			this.prefixo +
			this.getData()
		);
	}
}


module.exports = new createTicket();