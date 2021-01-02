import Service from "../Api/Api";

export const AtividadesPDF = async (Dados) => {

  try {
    const Data = Dados.ano && Dados.mes && `ano=${Dados.ano}&mes=${Dados.mes}`;
    const Info = Dados.tecnico ? `tecnico=${Dados.tecnico}` : `cliente=${Dados.cliente}`;
    const URL = `/pdf/atividades?${Data}&${Info}`;
    const resp = await Service.exec('get', URL);
  
    if (!resp.data.success) throw new Error(resp.data.message ? resp.data.message : "Erro em gerar PDF.")
    
    return resp.data.data

  } catch (error) {
    throw new Error(error);
  }

} 
