import Service from "../Api/Api";

export const getMyClientes = async () => {
  try {
    const Url = "/usuarios/clientes/1";
    const Dados = await Service.exec("get", Url);

    if(!Dados.data.success) throw ({ success: false, message: Dados.data.message ? Dados.data.message : 'Error em buscas os clientes do seu usuário.'});

    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    throw error;
  }
};


export const getPerfil = async () => {
  try {
    const Url = "/perfil";
    const Dados = await Service.exec("get", Url);

    if(!Dados.data.success) throw ({ success: false, message: Dados.data.message ? Dados.data.message : "Error em buscas os meus dados."});

    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    throw error;
  }
}


export const update = async (data) => {
  try {
    const Url = `/usuarios/${data.id}`;
    const Dados = await Service.exec("put", Url, data);

    if(!Dados.data.success) throw ({ success: false, message: Dados.data.message ? Dados.data.message : "Error em buscas os meus dados."});

    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    throw error;
  }
}
