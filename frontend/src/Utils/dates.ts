import moment from "moment";
moment.locale('pt-br');


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

function dateMoreDays(date: string, Days: number): string {
  const t1 = moment(date).format("x");
  const newDate = parseInt(t1) - 86400000 * Days;
  return moment(newDate).format("YYYY-MM-DD");
}

function getStatusAtividade(date: string): string{
  
  const currDate = moment().locale('pt-br').format('YYYY-MM-DD')

  if (!moment(date).isBefore(currDate, 'month')) {
    
    const days = moment('2021-03-14').locale('pt-br').diff(date, 'days');

    if (days <= 5)
      return 'green'
    else if (days <= 8)
      return 'yellow'
    else if (days <= 9)
      return 'orange'
    else 
      return 'red'
    
  } else {

    return 'red'
      
  }

}

export {
  TodayDate,
  handleDateTime,
  handleDateTimeFull,
  handleDate,
  dateMoreDays,
  permissionEditAtividade,
  getStatusAtividade
};
