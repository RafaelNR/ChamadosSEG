/**
 * * Recebe dados de um novo objeto um array de objetos, procura dentro Array de objetos se
 * * encontra objeto com id parecido com objeto, substitui ele;
 *
 * @param {object} newObject
 * @param {Array} stateArray
 */
export function newArrayState(newObject, stateArray) {
  const elementsIndex = stateArray.findIndex((obj) => obj.id === newObject.id);
  if (elementsIndex >= 0) stateArray[elementsIndex] = newObject;

  return stateArray;
}

/**
 * * Recebe um array de objetos e procura objetos duplicados se encontrar, não adicionar
 * * o objeto igual.
 * @param {Array} value
 */
export function uniquesValues(Values) {
  let newArray = [];

  Values.map((value) => {
    var duplicated =
      newArray.findIndex((redItem) => {
        return value.nome === redItem.nome;
      }) > -1;

    if (!duplicated) {
      return newArray.push(value);
    }

    return false;
  });

  return newArray;
}

/**
 * * Compara dois array e retorno um array novo com valores diferentes entre eles.
 * @param {Array} Array
 * @param {Array} Array
 */

export function comparaArrays(BigArray, Array) {
  if (BigArray.length === 0 || Array.length === 0) return [];

  let newArray = [];
  let newBigArray = [];

  BigArray.map((value) => {
    let duplicated =
      Array.findIndex((redItem) => {
        return value.id === redItem;
      }) > -1;

    if (!duplicated) {
      return newBigArray.push(value);
    } else {
      return newArray.push(value);
    }
  });

  return {
    newBigArray,
    newArray,
  };
}

/**
 * * Recebe uma string e retorna as inicial.
 * @param {strinf} FullName
 */
export function initialsName(FullName) {
  const arrayName = FullName.split(" ");
  const Iniciais = arrayName[0][0] + arrayName[1][0];
  return Iniciais.toUpperCase();
}
