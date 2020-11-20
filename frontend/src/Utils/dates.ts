import moment from 'moment'


function TodayDate(){
  return moment(new Date()).format("YYYY-MM-DD");
}

function handleDateTime(data: string) : string {
  return moment(data).format("DD/MM/YYYY hh:mm")
}

function handleDate (data: string, format : string = "DD/MM/YYYY") : string{
  return moment(data).format(format);
}


function dateMoreDays(date: string, Days: number): string{
  const t1 = moment(date).format('x');
  const newDate = parseInt(t1) - (86400000 * Days)
  return moment(newDate).format('YYYY-MM-DD');
}

export {
  TodayDate,
  handleDateTime,
  handleDate,
  dateMoreDays
}