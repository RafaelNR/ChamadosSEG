import Service from "../Api/Service";

class Log{

  async acesso() {
    try {
        const Dados = await Service.exec('get', '/logs/acessos');

      if (!Dados.data.success)
        throw new Error('Error em buscas os logs de acesso.');

        return {
          success: true,
          data: Dados.data.data
        };
      } catch (error) {
        throw error;
      }
  }

  async email() {
    try {
      const Dados = await Service.exec('get', '/logs/emails');

      if (!Dados.data.success)
        throw new Error('Error em buscas os logs de email.');
        
      return {
        success: true,
        data: Dados.data.data
      };
    } catch (error) {
      throw error;
    }
  }

}

export default new Log();
