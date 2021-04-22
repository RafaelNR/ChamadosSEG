const moment = require('moment')

/**
 * data solicitada é maior que 10 dias.
 */
const dateMaxFromInsertOrUpdate = (date) => {
  const max = moment().subtract(240, "hours");
  return moment(date).diff(max, "hours") <= 0 ? false : true;
}

/**
 * Data solicitada está fora do mes.
 */
const dateOtherMonth = (date) => {
	moment().locale("pt-br");
	const currMonth = moment(date).month() + 1;
	const Month = moment().month() + 1;
	if (currMonth === Month) {
		return true;
	} else {
		return false;
	}
};

/**
 * Data solicitada maior que a data atual;
 */
const dateMoreFromNow = (date) => {

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
	dateMaxFromInsertOrUpdate,
	dateOtherMonth,
	dateMoreFromNow,
};