import Service from "../Api/Api";

export const getCliente = async (ID) => {
  try {
    const Url = `/clientes/${ID}`;
    const Dados = await Service.exec("get", Url);

    if(!Dados.data.success) throw new Error({ success: false, message:"Error em buscas os clientes."});
    
    return {
      success: true,
      data: Dados.data.data,
    };
    
  } catch (error) {
    throw error;
  }
};
