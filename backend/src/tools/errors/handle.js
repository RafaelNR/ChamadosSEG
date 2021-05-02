

module.exports = (error) => {

  function sendCreateUpdateError() {
    if(error.code === 'ER_DUP_ENTRY'){
      const message = handle_DUP_ENTRY(error);
      return { message };
    }

    if (error.code === "ECONNREFUSED") {
			return { message: 'Falha em se conectar com o servidor, tente mais tarde.' };
		}

    if(error.validationError){
      return { message: error.error.details[0].message };
    }


    return { message: error instanceof Error ? error.message : error };
  }

  /**
   * Trata entradas duplicadas no banco.
   * @param {object} error 
   */
  function handle_DUP_ENTRY(error){
    const value = error.sqlMessage.split(/\s*'\s*/)[1];
    return `O valor ${value} já possui registro no banco e não pode ser duplicado.`;
  }


  return {
    sendCreateUpdateError,
  }

}