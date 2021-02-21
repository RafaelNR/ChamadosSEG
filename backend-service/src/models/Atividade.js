const knex = require("../database");


class Atividade {

  constructor(){
    this.db = knex;
  }

  async findByTicket(ticket) {

		return this.db
			.select(
				"atividades.id",
				"atividades.ticket",
				"atividades.date",
				"atividades.cliente_id",
				"users.nome as técnico",
				"atividades.created_at",
				"atividades.updated_at"
			)
			.from("atividades")
			.join("users", "users.id", "=", "atividades.user_id")
			.where("atividades.ticket", "=", ticket)
			.then((Atividade) => {
	
        
				if (Atividade.length <= 0) return Atividade;

				return this.db
					.select(
						"info.id",
						"descricao",
						"info.info_ticket",
						"users.nome as técnico",
						"categorias.nome as categoria",
						"categorias.id as categoria_id",
						"info.created_at",
						"info.updated_at"
					)
					.from("infos_atividades as info")
					.join("categorias", "categorias.id", "=", "info.categoria_id")
					.join("users", "users.id", "=", "info.user_id")
					.where("info.atividade_id", "=", Atividade[0].id)
					.orderBy("info.id")
					.then((infos) => {
						return {
							...Atividade[0],
							infos,
						};
          });
        
			}).then((Dados) => {

				return this.db
					.select(
						'id',
						'razao_social',
						'nome_fantasia',
						'cnpj_cpf',
						'email',
						'telefone',
						'representante',
						'n_contrato',
					)
					.from('clientes')
					.where('clientes.id', '=', Dados.cliente_id)
					.limit(1)
					.then(cliente => {
						return {
							...Dados,
							cliente: cliente[0],
						}
					})
			})
  }

	async countAtividadeByTicket(ticket){
		return await this.db
			.count("ticket as ticket")
			.from("atividades")
			.where("ticket", "=", ticket)
			.limit(1)
			.then((e) => e[0].ticket);
	}

}



module.exports = new Atividade();