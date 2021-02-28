const Model = require('../models/Pdf')

class LogPdf{
  async Register(Dados) {
    await Model.RegisterLog(Dados);
  }
}


module.exports = new LogPdf;