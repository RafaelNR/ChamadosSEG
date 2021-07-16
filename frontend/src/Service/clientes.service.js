import Service from "../Api/Service";

export const getClientes = async () => {
  try {
    const Url = `/clientes`;
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success)
      throw Dados.data

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error;
  }
};


export const getCliente = async (ID) => {
  try {
    const Url = `/clientes/${ID}`;
    const Dados = await Service.exec("get", Url);

    if (!Dados.data.success)
      throw Dados.data
    
    return {
      success: true,
      data: Dados.data.data,
    };
    
  } catch (error) {
    throw error;
  }
};

export const getClientesByUsuario = async (user_id) => {
  try {
    const Url = `/clientes/usuario/${user_id}`;
    const Dados = await Service.exec('get', Url);

    console.log(Dados)

    if (!Dados.data.success) throw Dados.data;

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error;
  }
};
