const compareDateMaxDays = (date, maxDays) => {

  const currDate = new Date().toISOString().split('T')[0];

  const t1 = new Date(currDate).getTime();
  const t2 = new Date(date).getTime();
  const MaxDate = 86400000 * maxDays;
  
  if(t2 >= (t1 - MaxDate)){
    return true
  }else{
    return false
  }

}


module.exports = {
  compareDateMaxDays,
}