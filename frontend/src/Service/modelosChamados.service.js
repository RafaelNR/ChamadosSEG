import Service from '../Api/Service';

export const getModelos = async () => {
  try {
    const Url = '/chamados/modelos/index';
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error carregar modelos.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};
