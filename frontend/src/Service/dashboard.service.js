import Service from "../Api/Service";


export const Atividades = async (ticket) => {
  try {
    const Dados = await Service.exec('get', '/dashboard/atividades');

    if (Dados.data.success) 
      return Dados.data;

    throw Dados.data;
    
  } catch (error) {
    throw error.data;
  }
};
