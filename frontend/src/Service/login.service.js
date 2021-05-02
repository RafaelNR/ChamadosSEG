import Service from "../Api/Service";
import {
  LoginSchema
} from "../Schemas/UserSchema";

export async function Login({user, passwd, permanecer}) {

  try {

    const Dados = await LoginSchema({
      user,
      passwd,
      permanecer
    })

    if (Dados.error) throw Dados;
    
    const Resp = await Service.exec("post", '/login', Dados);

    if (Resp.data.success) {
      return Resp.data.data;
    } else {
      throw Resp.data;
    }

  } catch (error) {
    throw error && error.data ? error.data : error 
  }

}


export async function Recuperar(email) {

  try {
    const Resp = await Service.exec('post', `recuperar-senha?email=${email}`);
    
    if (Resp.data.success) {
      return Resp.data.data;
    } else {
      throw Resp.data;
    }
    
  } catch (error) {
    throw error && error.data ? error.data : error 
  }
  

}