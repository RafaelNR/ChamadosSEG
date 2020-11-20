import Service from "../Api/Api";

export const getMyClientes = async () => {

  try {
    const Url = "/usuarios/clientes/1";
    const Dados = await Service.exec("get", Url);

    
    if(Dados.data.success){
      return {
        success: true,
        data: Dados.data.data
      }
    }

    throw {
      success: Dados.data.success,
      message: 'Error em buscas os clientes do seu usuário.'
    }

  } catch (error) {
    throw error;
  }
  
}
