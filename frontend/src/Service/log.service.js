import Service from "../Api/Service";

class Log{

  async acesso() {
    try {
        const Dados = await Service.exec('get', '/logs/acessos');

      if (!Dados.data.success)
        // eslint-disable-next-line
        throw {
          success: false,
          message: Dados.data.message
            ? Dados.data.message
            : 'Error em buscas os logs de acesso.'
        };

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
