import Service from "../Api/Service";
import {
  InsertSchema,
  InsertInfoSchema,
  UpdateInfoSchema,
} from "../Schemas/Atividades.Schema";
import { handleDate } from "../Utils/dates";


export const getAtividades = async (Dados) => {
  try {
    const { data_inicial, data_final, cliente, tecnico } = Dados;
    let query = '';
    if (data_inicial && data_final)
      query += `data_inicial=${data_inicial}&data_final=${data_final}&`;
    if (cliente) query += `cliente=${cliente}&`;
    if (tecnico) query += `tecnico=${tecnico}&`;

    const resp = await Service.exec('get', '/atividades?' + query);

    if (resp.data.success) return resp.data.data;

    throw resp.data;
  } catch (error) {
    throw error.data;
  }

}

export const getAtividade = async (ticket) => {
  try {
    console.log(ticket);
    const Url = `/atividades/ticket/${ticket}`;
    const Dados = await Service.exec("get", Url);

    if (Dados.data.success) 
      return Dados.data.data;

    throw Dados.data;
    
  } catch (error) {
    throw error;
  }
};

export const Insert = async (data) => {
  try {
    const validateData = await InsertSchema(data);
    if (validateData.error) return validateData;

    const Url = "/atividades";
    const Dados = await Service.exec("post", Url, {
      ...validateData,
      date: handleDate(validateData.date, "YYYY-MM-DD"),
    });

    if (Dados.data.success) 
      return Dados.data.data;

    throw Dados.data;

  } catch (error) {
    throw error;
  }
};

export const InsertInfo = async (data) => {
  try {
    const validateData = await InsertInfoSchema(data);
    if (validateData.error) return validateData;

    const Url = "/atividades/infos";
    const Dados = await Service.exec("post", Url, validateData);

    if (Dados.data.success)
      return Dados.data.data;

    throw Dados.data;

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

    if (Dados.data.success)
      return Dados.data.data;

    throw Dados.data;

  } catch (error) {
    throw error.data;
  }
};

export const AtividadePDF = async (ticket) => {
  try {

    const url = `/pdf/atividade/${ticket}`;
    const Dados = await Service.exec('get', url);

    if (Dados.data.success) {
      return Dados.data
    }

    throw Dados.data
    
  } catch (error) {
    console.log(error)
    throw error;
  }
};

