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

export const getMyClientes = async () => {
  try {
    const Url = `/clientes/my/1`;
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success) {
      // eslint-disable-next-line
      throw {
        success: false,
        message: Dados.data.message
          ? Dados.data.message
          : 'Error em buscas os clientes do seu usuário.'
      };
    }

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getClientesByUsuario = async (user_id) => {
  try {
    const Url = `/clientes/usuario/${user_id}`;
    const Dados = await Service.exec('get', Url);

    console.log(Dados);

    if (!Dados.data.success) throw Dados.data;

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error;
  }
};
