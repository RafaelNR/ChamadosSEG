const CronSendMailAtividades = require('./crons/CronSendMailAtividades')


class ManagerCron{
  constructor(){
    this.jobs = [CronSendMailAtividades];
  }

  run(){
    if(this.jobs.length > 0){
      this.jobs.map(Job => {
        Job.start();
      })
    }
  }

}

module.exports = new ManagerCron;