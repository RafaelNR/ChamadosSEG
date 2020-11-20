import Service from "../Api/Api";

export const getAllCategorias = async () => {

  try {
    const Url = "/categorias";
    const Dados = await Service.exec("get", Url);
    if(Dados.data.success){
      return {
        success: true,
        data: Dados.data.data
      }
    }
    throw 'Error';

  } catch (error) {
    console.log(error);
    console.log('Error em buscar categorias')
  }
  
}
