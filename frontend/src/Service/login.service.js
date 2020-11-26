import Service from "../Api/Api";
import {
  LoginSchema
} from "../Schemas/UserSchema";

export async function Login(user, passwd) {

  try {

    const Dados = await LoginSchema({
      user: user,
      passwd: passwd,
    })

    if(Dados.error) throw Dados;
    
    const Resp = await Service.exec("post", '/login', Dados);

    if (Resp.data.success) {
      return Resp.data.data;
    } else {
      throw Resp;
    }

  } catch (error) {
    throw error.data ? error.data : error 
  }

}
