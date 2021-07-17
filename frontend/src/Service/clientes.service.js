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

<<<<<<< HEAD
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

export const getClientesByUser = async (user_id) => {
=======
export const getClientesByUsuario = async (user_id) => {
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96
  try {
    const Url = `/clientes/usuario/${user_id}`;
    const Dados = await Service.exec('get', Url);

<<<<<<< HEAD
    if (!Dados.data.success) {
      // eslint-disable-next-line
      throw {
        success: false,
        message: Dados.data.message
          ? Dados.data.message
          : 'Error em buscas os clientes do usuário.'
      };
    }
=======
    console.log(Dados)

    if (!Dados.data.success) throw Dados.data;
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
<<<<<<< HEAD
    console.log(error);
    throw error;
  }
};
=======
    throw error;
  }
};
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96
