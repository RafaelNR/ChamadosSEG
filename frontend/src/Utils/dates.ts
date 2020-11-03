import moment from 'moment'

const handleDateTime = (Data) => {
  return moment(Data).format("DD/MM/YYYY hh:mm")
}

const handleDate = (Data) => {
  return moment(Data).format("DD/MM/YYYY");
}


export {
  handleDateTime,
  handleDate
}