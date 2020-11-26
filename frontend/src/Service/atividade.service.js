import Service from "../Api/Api";
import { InsertSchema, InsertInfoSchema, UpdateInfoSchema } from "../Schemas/Atividades.Schema";
import { handleDate } from '../Utils/dates'

export const Insert = async (data) => {


  try {
		const validateData = await InsertSchema(data);
    if (validateData.error) return validateData;

		const Url = "/atividades";
    const Dados = await Service.exec("post", Url, {
			...validateData,
			date: handleDate(validateData.date, "YYYY-MM-DD")
		});

    if(Dados.data.success){
      return Dados.data.data;
    } else {
      throw Dados;
    }

  } catch (error) {
    throw error.data;
  }
  
}

export const InsertInfo = async (data) => {

  try {
		const validateData = await InsertInfoSchema(data);
		if (validateData.error) return validateData;

		const Url = "/atividades/infos";
		const Dados = await Service.exec("post", Url, validateData);

		if (Dados.data.success) {
			return Dados.data.data;
		} else {
			throw Dados;
		}
	} catch (error) {
		throw error.data;
	}
};


export const UpdateInfo = async (data) => {

	  try {
			const validateData = await UpdateInfoSchema({
				id: data.id,
				descricao: data.descricao,
				categoria_id: data.categoria_id,
			});

			if (validateData.error) return validateData;

			const Url = `/atividades/infos/${data.id}`;
			const Dados = await Service.exec("put", Url, validateData);

			console.log(Dados);
			if (Dados.data.success) {
				return Dados.data.data
			} else {
				throw Dados;
			}
		} catch (error) {
			throw error.data;
		}

}