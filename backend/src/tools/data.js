const moment = require('moment')

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

const compareDateMonth = (date) => {
  moment().locale("pt-br");
  const currMonth = moment(date).month() + 1;
  const Month = moment().month() + 1;
  if (currMonth === Month) {
    return true;
  } else {
    return false;
  }

};


const compareDateLargerToday = (date) => {

  const currDate = new Date().toISOString().split("T")[0];

  const t1 = new Date(currDate).getTime();
  const t2 = new Date(date).getTime();

  if (t2 > t1) {
    return false;
  } else {
    return true;
  }


}


module.exports = {
	compareDateMaxDays,
	compareDateMonth,
	compareDateLargerToday,
};