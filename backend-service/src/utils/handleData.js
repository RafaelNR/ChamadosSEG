const moment = require('moment');
moment.locale("pt-br");

const handleDataInfo = (Infos) => {

  const newInfos = Infos.map(info => {
    
    return {
			...info,
			date_format: moment(info.date).format("DD/MM/YYYY"),
		};

  })

  return newInfos;

}


const dateFormat = Date => moment(Date).format("DD/MM/YYYY");


const getNomeMes = Mes => moment(Mes).format('MMMM')



module.exports = {
  handleDataInfo,
  dateFormat,
  getNomeMes
}