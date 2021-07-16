import Service from "../Api/Service";


export const getUsers = async () => {
  try {
    const Url = '/usuarios';
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success)
      // eslint-disable-next-line
      throw {
        success: false,
        message: Dados.data.message
          ? Dados.data.message
          : 'Error em buscas os técnicos.'
      };

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (ID) => {
  try {
    const Url = `/usuarios/${ID}`;
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success)
      // eslint-disable-next-line
      throw {
        success: false,
        message: Dados.data.message
          ? Dados.data.message
          : 'Error em buscas os técnicos.'
      };

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getUserByCliente = async (cliente_id) => {
    try {
      const Url = `/usuarios/cliente/${cliente_id}`;
      const Dados = await Service.exec('get', Url);

      if (!Dados.data.success) {
        throw new Error(
          Dados.data.message || 'Error em buscas usuários desse cliente.'
        );
      }

      return {
        success: true,
        data: Dados.data.data
      };

    } catch (error) {
      console.log(error);
      throw error;
    }
}

export const getMyClientes = async (ID) => {
  try {
    const Url = `/usuarios/clientes/my/${ID}`;
    const Dados = await Service.exec("get", Url);

    if (!Dados.data.success) {
      // eslint-disable-next-line
      throw ({ success: false, message: Dados.data.message ? Dados.data.message : 'Error em buscas os clientes do meu usuário.' });
    }

    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    console.log(error)
    throw error;
  }
};


export const getPerfil = async () => {
  try {
    const Url = "/perfil";
    const Dados = await Service.exec("get", Url);

    if (!Dados.data.success) {
      // eslint-disable-next-line
      throw ({ success: false, message: Dados.data.message ? Dados.data.message : "Error em buscas os meus dados." });
    }

    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const getUsersAtribuiveis = async (requerente_id) => {
  try {
    const Url = `/usuarios/atribuiveis/chamado/${requerente_id}`;
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success) {
      throw new Error(Dados.data.message || 'Error carregar chamado.');
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

export const updatePerfil = async (data) => {
  try {
    const Url = `/usuarios/perfil/${data.id}`;
    const Dados = await Service.exec('put', Url, data);
    
    if (!Dados.data.success) {
      // eslint-disable-next-line
      throw {
        success: false,
        message: Dados.data.message
          ? Dados.data.message
          : 'Error em buscas os meus dados.'
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


export const update = async (data) => {
  try {
    console.log(data)
    const Url = `/usuarios/${data.id}`;
    const Dados = await Service.exec("put", Url, data);

    console.log(Dados)

    if (!Dados.data.success) {
      // eslint-disable-next-line
      throw ({ success: false, message: Dados.data.message ? Dados.data.message : "Error em buscas os meus dados." });
    }

    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    console.log(error)
    throw error;
  }
}