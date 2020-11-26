import moment from "moment";

function TodayDate() {
  return moment(new Date()).format("YYYY-MM-DD");
}

function handleDateTime(data: string): string {
  return moment(data).format("DD/MM/YYYY hh:mm");
}

function handleDate(data: string, format: string = "DD/MM/YYYY"): string {
  return moment(data).format(format);
}

function permissionEditAtividade(atividade_date: any): boolean {
  const currDate = new Date().toISOString().split("T")[0];

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

export {
  TodayDate,
  handleDateTime,
  handleDate,
  dateMoreDays,
  permissionEditAtividade,
};
