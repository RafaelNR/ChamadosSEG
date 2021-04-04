import md5 from 'md5'

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

  async getImage() {
    this.parserEmail()
    this.parserMd5();
    return await this.fetchImage(this.url + this.hash + '?d=404');
  }

  async fetchImage(Imagem) {
    const myRequest = new Request(Imagem);
    const response = await fetch(myRequest);

    if (response.status === 200) {
      return response.url
    }else{
      return false;
    }
  }

}


export default Gravatar;