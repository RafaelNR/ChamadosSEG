import Service from "../Api/Service";


export const MyAtividades = async () => {
  try {
    const Dados = await Service.exec('get', '/dashboard/my/atividades');

    if (Dados.data.success) 
      return Dados.data;

    throw Dados.data;
    
  } catch (error) {
    throw error.data;
  }
};


export const MyClientesAtividades = async () => {
  try {
    const Dados = await Service.exec('get', '/dashboard/my/clientes');

    if (Dados.data.success) return Dados.data;

    throw Dados.data;
  } catch (error) {
    throw error.data;
  }
}


export const ClienteAtividades = async (cliente_id) => {
  try {
    const Dados = await Service.exec(
      'get',
      `/dashboard/my/cliente/${cliente_id}`
    );

    if (Dados.data.success) return Dados.data;

    throw Dados.data;
  } catch (error) {
    throw error.data;
  }
};
