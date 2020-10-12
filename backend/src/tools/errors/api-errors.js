

module.exports = (res,error) => {
  
  function AuthErrors(){
    return res.status(401).json({			
      success: false,
			auth: false,
			token: null,
      message: error.message,
    })
  }

  function sendCreateUpdateError(){
    if(error.code === 'ER_DUP_ENTRY'){
      const message = handle_DUP_ENTRY(error);
      return { success: false, message };
    }

    if(error.validationError){
      return { success: false, message: error.error.details[0].message };
    }

    return { success: false, message: error };
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
    AuthErrors,
    sendCreateUpdateError,
  }

}