const knex = require("../database");


class Atividades {
	constructor() {
		this.db = knex;
	}

	// async getInfosbyCliente(Query) {
	// 	return await this.db
	// 		.select(
	// 			"atividades.ticket",
	// 			"info.info_ticket",
	// 			"atividades.date",
	// 			"info.descricao",
	// 			"user.nome as tecnico",
	// 			"categoria.nome as categoria",
	// 			"info.created_at",
	// 			"info.updated_at"
	// 		)
	// 		.from("infos_atividades as info")
	// 		.leftJoin("atividades", "atividades.id", "=", "info.atividade_id")
	// 		.leftJoin(
	// 			"categorias as categoria",
	// 			"categoria.id",
	// 			"=",
	// 			"info.categoria_id"
	// 		)
	// 		.leftJoin("users as user", "user.id", "=", "info.user_id")
	// 		.whereRaw(
	// 			`atividades.date between '${Query.data_inicial}' and '${Query.data_final}' `
	// 		)
	// 		.andWhere("atividades.cliente_id", "=", Query.cliente_id)
	// 		.orderBy("atividades.date");
	// }

	// async getInfosbyTecnico(Query) {
	// 	return await this.db
	// 		.select(
	// 			"atividades.ticket",
	// 			"info.info_ticket",
	// 			"atividades.date",
	// 			"info.descricao",
	// 			"user.nome as tecnico",
	// 			"categoria.nome as categoria",
	// 			"info.created_at",
	// 			"info.updated_at"
	// 		)
	// 		.from("infos_atividades as info")
	// 		.leftJoin("atividades", "atividades.id", "=", "info.atividade_id")
	// 		.leftJoin(
	// 			"categorias as categoria",
	// 			"categoria.id",
	// 			"=",
	// 			"info.categoria_id"
	// 		)
	// 		.leftJoin("users as user", "user.id", "=", "info.user_id")
	// 		.whereRaw(
	// 			`atividades.date between '${Query.data_inicial}' and '${Query.data_final}' `
	// 		)
	// 		.andWhere("info.user_id", "=", Query.tecnico)
	// 		.orderBy("atividades.date");
	// }

	// async getInfosbyClienteAndTecnico(Query) {
	// 	return await this.db
	// 		.select(
	// 			"atividades.ticket",
	// 			"info.info_ticket",
	// 			"atividades.date",
	// 			"info.descricao",
	// 			"user.nome as tecnico",
	// 			"categoria.nome as categoria",
	// 			"info.created_at",
	// 			"info.updated_at"
	// 		)
	// 		.from("infos_atividades as info")
	// 		.leftJoin("atividades", "atividades.id", "=", "info.atividade_id")
	// 		.leftJoin(
	// 			"categorias as categoria",
	// 			"categoria.id",
	// 			"=",
	// 			"info.categoria_id"
	// 		)
	// 		.leftJoin("users as user", "user.id", "=", "info.user_id")
	// 		.whereRaw(
	// 			`atividades.date between '${Query.data_inicial}' and '${Query.data_final}' `
	// 		)
	// 		.andWhere("info.user_id", "=", Query.tecnico)
	// 		.andWhere("atividades.cliente_id", "=", Query.cliente_id)
	// 		.orderBy("atividades.date");
  // }

  async getCliente(cliente_id) {
    return await this.db.select('*').from('clientes').where('id','=',cliente_id).then(e => e[0])
  }

  async getTecnico(tecnico) {
    return await this.db
			.select("nome","email","telefone","imagem")
			.from("users")
			.where("id", "=", tecnico)
			.then((e) => e[0]);
  }

  async getTecnicosByCliente(cliente_id) {
    return await this.db
      .select('user.id', 'user.nome')
      .from('cliente_has_user as cs')
      .innerJoin('users as user', "user.id", '=', "cs.user_id")
      .where('cs.cliente_id','=', cliente_id)
  }

  async getClientesByTecnico(tecnico) {
    return await this.db
			.select("nome_fantasia as nome","representante","email")
			.from("cliente_has_user as cs")
			.innerJoin("clientes as cliente", "cliente.id", "=", "cs.cliente_id")
			.where("cs.user_id", "=", tecnico);
	}
	

	async getDados(Dados) {

		let query = `SELECT atividade.ticket, info.info_ticket, atividade.date, info.descricao, user.nome as tecnico, cliente.nome_fantasia as cliente, categoria.nome as categoria, info.created_at, info.updated_at FROM infos_atividades as info LEFT JOIN atividades as atividade ON atividade.id = info.atividade_id LEFT JOIN categorias as categoria ON categoria.id = info.categoria_id LEFT JOIN users as user ON user.id = info.user_id LEFT JOIN clientes as cliente ON cliente.id = atividade.cliente_id`;
		
		if (Dados.data_inicial && Dados.data_final) {
			
			query += ` WHERE atividade.date BETWEEN '${Dados.data_inicial}' AND '${Dados.data_final}' `;

		} else if (Dados.periodo) {
			
			query += ` WHERE MONTH(date) = ${Dados.periodo.mes} AND YEAR(date) = ${Dados.periodo.ano} `;

		}
		
		if (Dados.tecnico) {
			
			query += `AND info.user_id = ${Dados.tecnico} `;

		} else if (Dados.cliente_id) {
			
			query += `AND atividade.cliente_id = ${Dados.cliente_id} `; 

		}	


		query += `ORDER BY atividade.date`;


		return await this.db.raw(query).then(e => e[0])

	}


  
}


module.exports = new Atividades();