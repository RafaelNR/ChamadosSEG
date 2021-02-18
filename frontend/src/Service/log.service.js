import Service from "../Api/Service";

class Log{

  async index() {
    try {
        const Dados = await Service.exec('get', '/log');

        if (!Dados.data.success)
          throw {
            success: false,
            message: Dados.data.message
              ? Dados.data.message
              : 'Error em buscas os logs.'
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
