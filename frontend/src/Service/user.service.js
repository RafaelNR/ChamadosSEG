import Service from "../Api/Api";

export const getMyClientes = async () => {
  try {
    const Url = "/usuarios/clientes/1";
    const Dados = await Service.exec("get", Url);

    if (Dados.data.success) {
      return {
        success: true,
        data: Dados.data.data,
      };
    }

    throw {
      success: false,
      message: "Error em buscas os clientes do seu usuário.",
    };
  } catch (error) {
    throw error;
  }
};


export const getPerfil = async () => {
  try {
    const Url = "/perfil";
    const Dados = await Service.exec("get", Url);

    if (Dados.data.success) {
      return {
        success: true,
        data: Dados.data.data,
      };
    }

    throw {
      success: false,
      message: "Error em buscas os meus dados.",
    };
  } catch (error) {
    throw error;
  }
}


export const update = async (data) => {
  try {
    const Url = `/usuarios/${data.id}`;
    const Dados = await Service.exec("put", Url, data);

    if (Dados.data.success) {
      return {
        success: true,
        data: Dados.data.data,
      };
    }

    throw {
      success: false,
      message: "Error em buscas os meus dados.",
    };
  } catch (error) {
    throw error;
  }
}
