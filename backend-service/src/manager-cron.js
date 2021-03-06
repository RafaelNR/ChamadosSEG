const CronSendMailAtividades = require('./crons/CronSendMailAtividades')


class ManagerCron{
  constructor(){
    this.jobs = [CronSendMailAtividades];
  }

  run() {
    if(this.jobs.length > 0){
      this.jobs.map(Job => {
        Job.start();
      })
      console.log("->> CRONManager - Tarefas agendadas corretamente.");
    } else {
      console.log("->> CRONManager - Erro no agendamento das tarefas.");
    }
  }

}

module.exports = new ManagerCron;