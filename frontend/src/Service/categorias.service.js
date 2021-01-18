import Service from "../Api/Service";

export const getAllCategorias = async () => {
  try {
    const Url = "/categorias";
    const Dados = await Service.exec("get", Url);

    if(!Dados.data.success) throw new Error("Error carregar categorias.");
    
    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    throw error.data;
  }
};
