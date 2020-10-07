/**
 * * Recebe dados de um novo objeto um array de objetos procura dentro e
 * * encontra objeto com id parecido substitui ele.
 * 
 * @param {object} newObject 
 * @param {Array} stateArray 
 */
export function newArrayState(newObject, stateArray) {
  const elementsIndex = stateArray.findIndex((obj) => obj.id == newObject.id);
  if (elementsIndex >= 0) stateArray[elementsIndex] = newObject
  
  return stateArray;
}


export function initialsName(FullName){
  const arrayName = FullName.split(' ');
  const Iniciais = arrayName[0][0] + arrayName[1][0];
  return Iniciais.toUpperCase();
}