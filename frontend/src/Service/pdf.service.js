import Service from "../Api/Service";

export const AtividadesPDF = async (Dados) => {

  try {
    const Data = Dados.ano && Dados.mes && `ano=${Dados.ano}&mes=${Dados.mes}`;
    const Info = Dados.tecnico ? `tecnico=${Dados.tecnico}` : `cliente=${Dados.cliente}`;
    const URL = `/pdf/atividades?${Data}&${Info}`;

    console.log(URL)

    const resp = await Service.exec('get', URL);
  
    if (!resp.data.success) throw (resp.data.message ? resp.data.message : "Erro em gerar PDF.")
    
    return resp.data.data

  } catch (error) {
    throw error && error.data ? error.data : error 
  }

} 


export const AtividadePDF = async (Ticket) => {

    try {
      const URL = `/pdf/atividade/${Ticket}`;
      const resp = await Service.exec('get', URL);
      
      if (!resp.data.success)
        throw(
          resp.data.message ? resp.data.message : 'Erro em gerar PDF.'
        );

      return resp.data;
    } catch (error) {
      throw error && error.data ? error.data : error 
    }
  
}