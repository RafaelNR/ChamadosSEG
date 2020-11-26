import Service from "./Api";

/**
 *& Busca por todos os dados;
 * @param {string} url
 */
export function get(url) {
  //return Service.promise(Service.exec('get',"/" + url), 4000);
  return Service.exec("get", "/" + url);
}

/**
 *& Busca por um ID;
 * @param {string} url
 * @param {number} ID
 */
export async function getByID(url, ID) {
  const newUrl = "/" + url + "/" + ID;
  //return Service.promise(Service.exec('get',newUrl), 4000)
  return await Service.exec("get", newUrl);
}

/**
 *& Insert um novo objeto;
 * @param {string} url
 * @param {object} data
 */
export function insert(url, data) {
  const newUrl = "/" + url;
  //return Service.promise(Service.exec("post", newUrl, data), 400);

  return Service.exec("post", newUrl, data);
}

/**
 *& Faz o update do objeto;
 * @param {string} url
 * @param {object} data
 */
export function update(url, data) {
  const newUrl = `/${url}/${data.id}`;
  //return Service.promise(Service.exec('put',newUrl,data), 400);

  return Service.exec("put", newUrl, data);
}

/**
 *& Deletar o objeto pelo ID;
 * @param {string} url
 * @param {number} ID
 */
export function deletar(url, ID) {
  const newUrl = `/${url}/${ID}`;
  return Service.exec("delete", newUrl);
}

/**
 *& Desabilita o objeto pelo ID;
 * @param {string} url
 * @param {number} ID
 */
export function disabled(url, ID) {
  const newUrl = `/${url}/${ID}`;
  return Service.exec("delete", newUrl);
}

/**
 *& Ativa o objeto pelo ID;
 * @param {string} url
 * @param {number} ID
 */
export function actived(url, ID) {
  const newUrl = `/${url}/actived/${ID}`;
  return Service.exec("put", newUrl);
}

export default Service;
