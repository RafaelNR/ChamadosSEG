import Service from '../Api/Service';
import {ChangePasswd} from '../Schemas/UserSchema'


export async function getHash(hash) {
  try {
    const Resp = await Service.exec('get', `recuperar-senha?hash=${hash}`);

    if (Resp.data.success) {
      return Resp.data.data;
    } else {
      throw Resp.data;
    }
  } catch (error) {
    throw error && error.data ? error.data : error;
  }
}


export const changePasswd = async (Dados) => {

  try {

    const passwd = await ChangePasswd(Dados.passwd);

    if (passwd.error) throw passwd.errors
      
      const Resp = await Service.exec(
        'put',
        '/recuperar-senha',
        {
          ...Dados,
          passwd
        }
      );

    if (Resp.data.success) {
      return Resp.data.data;
    } else {
      throw Resp.data;
    }
  } catch (error) {
    throw error && error.data ? error.data : error;
  }
}