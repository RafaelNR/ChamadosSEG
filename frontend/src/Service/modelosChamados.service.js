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

export const getModelosAll = async () => {
  try {
    const Url = '/chamados/modelos/all';
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

export const Insert = async (modelo) => {
  try {
    const Url = `/chamados/modelos/`;
    const Dados = await Service.exec('post', Url, modelo);

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error em inserir modelo.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};


export const Update = async (modelo) => {
  try {
    const Url = `/chamados/modelos/${modelo.id}`;
    const Dados = await Service.exec('put', Url, modelo);

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error em atualizar modelo.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const Deletar = async (ID) => {
  try {
    const Url = `/chamados/modelos/${ID}`;
    const Dados = await Service.exec('delete', Url);

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error em excluir modelo.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

