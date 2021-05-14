import moment from "moment";
import 'moment/locale/pt-br';

function TodayDate() {
  return moment(new Date()).format("YYYY-MM-DD");
}

function handleDateTime(data: string): string {
  return moment(data).format("DD/MM/YYYY HH:mm");
}

function handleDateTimeFull(data: string): string {
  return moment(data).format("DD/MM/YYYY HH:mm:ss");
}

function handleDate(data: string, format: string = "DD/MM/YYYY"): string {
  return moment(data).format(format);
}

function permissionEditAtividade(atividade_date: any): boolean {
  const currDate = new Date().toISOString().split("T")[0];


  const MonthAtividade = moment(atividade_date).month() + 1;
  const MonthCurr = moment(new Date()).month() + 1

  if (MonthAtividade !== MonthCurr) return false;

  const t1 = new Date(currDate).getTime();
  const t2 = new Date(atividade_date).getTime();
  //const MaxDate = 86400000 * 2;

  return t2 >= t1 - 86400000 * 10 ? true : false;
}

/**
 * @param date data atual
 * @param Days dia que no max podem abrir atividade;
 * @return Retorna a data maxima para abrir a atividade.
 */
function dateMaxOpenAtividade(date: string, Days: number): string {
  return moment(date).subtract(Days,'days').format("YYYY-MM-DD");
}


function getStatusAtividade(date: string): boolean{
  return moment().diff(date, 'days') <= 9 ? true : false
}

function getColorAtividade(date: string): object{
  
  const currDate = moment().format('YYYY-MM-DD')

  // Se date é do proximo mês, já retorna red.
  if (!moment(date).isBefore(currDate, 'month')) {
    
    const days = moment(currDate).diff(date, 'days');

    if (days <= 2)
      return {
        backgroundColor: '#4b9609',
        color: 'white',
      }
    if (days <= 4)
      return {
        backgroundColor: '#fce83a',
        color: 'black',
      }
    else if (days <= 8)
      return {
        backgroundColor: '#f2930c',
        color: 'white',
      }
    else if (days <= 9)
      return {
        backgroundColor: '#e2580b',
        color: 'white',
      }
    else 
      return {
        backgroundColor: '#cc060c',
        color: 'white',
      }
    
  } else {

    return {
      backgroundColor: '#cc060c',
      color: 'white',
    }
      
  }
}

function dateEndOfAtividade(date: string): string{

  if (getStatusAtividade(date)) {
    const maxDateForEdit = moment(date).add(9, 'days').format('YYYY-MM-DD') + ' 23:59:59';
    return moment(maxDateForEdit).startOf('seconds').fromNow();
  } else {
    return 'close';
  }

}

function converterFileInData(file: string): string {
  if (file) {
    const [mes, ano, cliente_id] = file.split('-');
    const currAno = moment(ano).locale("pt-br").format("Y");
    const nameMes = moment(mes).locale("pt-br").format("MMMM");
    return `${nameMes}/${currAno}`;
  }
  return file;
}

export {
  TodayDate,
  handleDateTime,
  handleDateTimeFull,
  handleDate,
  dateMaxOpenAtividade,
  permissionEditAtividade,
  getColorAtividade,
  getStatusAtividade,
  dateEndOfAtividade,
  converterFileInData
};
