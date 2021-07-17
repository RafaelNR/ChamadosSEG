import Service from "../Api/Service";


export const MyUserAtividades = async () => {
  try {
    const Dados = await Service.exec('get', '/dashboard/atividades/my_user');

    if (Dados.data.success) 
      return Dados.data;

    throw Dados.data;
    
  } catch (error) {
    throw error.data;
  }/*  */
};


export const MyClientesAtividades = async () => {
  try {
    const Dados = await Service.exec(
      'get',
      '/dashboard/atividades/my_clientes'
    );
    
    if (Dados.data.success) return Dados.data;

    throw Dados.data;
  } catch (error) {
    throw error.data;
  }
}

export const AtividadesAll = async () => {
  try {
    const Dados = await Service.exec('get', '/dashboard/atividades/all');

    if (Dados.data.success) return Dados.data;

    throw Dados.data;
  } catch (error) {
    throw error.data;
  }
};


export const MyClienteAtividades = async (cliente_id) => {
  try {
    const Dados = await Service.exec(
      'get',
      `/dashboard/atividades/my_cliente/${cliente_id}`
    );

    if (Dados.data.success) return Dados.data;

    throw Dados.data;
  } catch (error) {
    throw error.data;
  }
};
