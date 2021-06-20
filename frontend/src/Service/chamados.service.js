import Service from '../Api/Service';


export const getChamados = async () => {
  try {
    const Url = '/chamados';
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success) throw new Error(Dados.data.message || 'Error carregar chamado.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const getChamadosRequeridosFromMe = async () => {
  try {
    const Url = '/chamados/requerentes/my';
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success) throw new Error(Dados.data.message || 'Error carregar chamado.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
}

export const getChamadosAtribuidosFromMe = async () => {
  try {
    const Url = '/chamados/atribuidos/my';
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success) throw new Error(Dados.data.message || 'Error carregar chamado.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const getChamado = async (ID) => {
  try {
    const Url = `/chamados/${ID}`;
    const Dados = await Service.exec('get', Url);
    if (!Dados.data.success) {
      throw new Error(Dados.data.message || 'Error carregar chamado.');
    }

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const getAcmChamado = async (chamado_id) => {
  try {
    const Url = `/chamados/acm/${chamado_id}`;
    const Dados = await Service.exec('get', Url);

    

    if (!Dados.data.success) {
      throw new Error(Dados.data.message || 'Error carregar acompanhamentos do chamado.');
    }

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};



export const changePrioridade = async (id, newPrioridade) => {
  try {
    const Url = `/chamados/${id}`;
    const Dados = await Service.exec('put', Url, {
      prioridade: newPrioridade
    });

    if (!Dados.data.success) throw new Error(Dados.data.message || 'Error alterar a prioridade.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};


export const changeStatus = async (id, newStatus) => {
  try {
    const Url = `/chamados/${id}`;
    const Dados = await Service.exec('put', Url, {
      status: newStatus
    });

    console.log(Dados.data.message);

    if (!Dados.data.success) throw new Error(Dados.data.message || 'Error alterar o status.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const Update = async (Chamado) => {
  try {
    const Url = `/chamados/${Chamado.id}`;
    const Dados = await Service.exec('put', Url, {
      ...Chamado
    });

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error em alterar o chamado.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};


export const Insert = async (Chamado) => {
  try {
    const Url = `/chamados/`;
    const Dados = await Service.exec('post', Url,{
      ...Chamado
    });

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error em inserir o chamado.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const InsertAcm = async (Acm) => {
  try {
    const Url = `/chamados/acm/`;
    const Dados = await Service.exec('post', Url, Acm);

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error em inserir acompanhamento.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const UpdateAcm = async (Acm) => {
  try {
    const Url = `/chamados/acm/${Acm.id}`;
    const Dados = await Service.exec('put', Url, Acm);

    if (!Dados.data.success)
      throw new Error(Dados.data.message || 'Error em atualizar acompanhamento.');

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};

export const getCountTypeAcompanhamentos = async () => {
  try {
    const Url = `/chamados/acm/count/type`;
    const Dados = await Service.exec('get', Url);

    if (!Dados.data.success) {
      throw new Error(
        Dados.data.message || 'Error carregar acompanhamentos do chamado.'
      );
    }

    return {
      success: true,
      data: Dados.data.data
    };
  } catch (error) {
    throw error.data ? error.data : error;
  }
};
