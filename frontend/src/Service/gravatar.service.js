import md5 from 'md5'
import axios from 'axios'


class Gravatar {

  constructor(email) {
    this.email = email
    this.hash = '';
    this.url = 'https://www.gravatar.com/avatar/'
  }

  parserEmail() {
    this.email = this.email.trim().toLowerCase();
  }

  parserMd5() {
    this.hash = md5(this.email);
  }

  getImage() {
    this.parserEmail()
    this.parserMd5();
    return this.url + this.hash;
  }

}


export default Gravatar;