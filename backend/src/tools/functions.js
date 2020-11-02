
class createTicket {


  getData() {
    const date = new Date();
    const Ano = date.getFullYear();
    const Mes = date.getMonth()+1;
    const Day =
      date.getDate() > 0 && date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    
    return `${Ano}`+`${Mes}`+`${Day}`
  }

	created() {
    return (
      Math.floor(Math.random() * 9999) +
      "_" + this.getData()
		);
  }
  
  createdInfo() {
    return Math.floor(Math.random() * 99999) + "_" + this.getData();
  }
}



module.exports = new createTicket();