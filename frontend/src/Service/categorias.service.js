import Service from "../Api/Service";

export const getAllCategorias = async () => {
  try {
    const Url = "/categorias";
    const Dados = await Service.exec("get", Url);

    if(!Dados.data.success) throw new Error("Error");
    
    return {
      success: true,
      data: Dados.data.data,
    };

  } catch (error) {
    console.log(error);
    console.log("Error em buscar categorias");
  }
};
