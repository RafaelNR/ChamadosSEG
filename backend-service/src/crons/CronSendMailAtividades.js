const Cron = require('cron').CronJob
const Email = require('../classes/email')
const PDF = require('../classes/pdf');
const { getClientes } = require('../models/Clientes')
const { getTecnicosByCliente } = require('../models/Tecnicos');


class CronSendMailAtividades{

  constructor(){
    this.config = {
      //cronTime: '0 0 0 1 * *',
      cronTime: '0 13 22 1 * *',
      start: true,
      onTick: () => {
        this.onTick()
      },
      onComplete: null,
      timeZone: 'America/Sao_Paulo',
      runOnInit: false
    }
  }

  start(){
    this.Job = new Cron({...this.config});
    if(this.Job.running){
      console.log('->> CRON - SendMailAtividades - Tarefa agendada corretamente.')
      console.log("->> CRON - SendMailAtividades - Próxima execução: ", this.Job.nextDate().format('DD/MM/YY HH:mm:ss'))
    }else{
      console.log('->> CRON - Erro em agendar tarefas.')
    }
  }

  async onTick(){
    const d = new Date();
    console.log('Init First:', d);

    try {
      const Clientes = await getClientes()

      Clientes.map(async Cliente => {

        const Tecnicos = await getTecnicosByCliente(Cliente.id);
        const filename = await this.createdPdf('2','2021', Cliente.id);
        
        if(!filename.message){
          this.sendEmail(Cliente.email, Cliente.nome_fantasia, filename,{
            data_ano: 'Fevereiro/2021',
            tecnicos: Tecnicos,
          })
        }
        
      })
      
    } catch (error) {
      console.log(error);
    }

  }

  onComplete(){
    console.log('teste')
    this.Job.stop()
  }

  sendEmail(clienteEmail,clienteName,filename, dados){
    const email = new Email();

    email.to = clienteEmail
    email.subject = `Relatório Mensal de Atividade - ${clienteName}`;
    email.filename = `Relatório Mensal de Atividade - ${clienteName}`;
    email.file = filename;
    email.type = "Relatório Mensal de Atividades";
    email.dados = dados;

    email.send().then(resp => {
      console.log(resp)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      console.log('->> CRON - NextDates:', this.Job.nextDates().format('DD/MM/YY HH:mm:ss'));
    })
  }

  async createdPdf(mes,ano,ClienteID){
    const pdf = new PDF;
    return await pdf.create(mes,ano,ClienteID);
  }


}


module.exports = new CronSendMailAtividades;