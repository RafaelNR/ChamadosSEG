import { v1 as uuidv1 } from 'uuid';

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

export function uniquesObjects(arrayObjects) {
  return arrayObjects.filter((elem, index, self) => index === self.indexOf(elem));
}

/**
 * * Compara dois array e retorno um array novo com valores diferentes entre eles.
 * * Deve receber somente o item a ser comparado, id, nome....
 * @param {Array} BigArray
 * @param {Array} littleArray
 */

export function comparaArrays(BigArray, littleArray) {
  if (BigArray.length === 0 || littleArray.length === 0) return [];

  let newArray = [];
  let newBigArray = [];

  BigArray.map((value) => {
    let duplicated =
      littleArray.findIndex((redItem) => {
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
    newArray
  };
}

/**
 * * Recebe uma string e retorna as inicial.
 * @param {string} FullName
 */
export function initialsName(FullName) {
  const arrayName = FullName.split(" ");


  if(arrayName.length >= 2){
    const I1 = arrayName[0][0] ? arrayName[0][0] : '';
    const I2 = arrayName[1][0] ? arrayName[1][0] : '';
    const Iniciais = I1 + I2;
    return Iniciais.toUpperCase();
  }

  return FullName.substr(0, 2).toUpperCase();

}

export function handleHeaderName(Path, Headers) {
  const paths = Path.split('/');

  const Acc = Headers.reduce((acc, valorAtual, index, array) => {

    if (acc.length === 0) {
      if (paths[index] && paths[index] !== "") {
        // eslint-disable-next-line
        return array.filter(({ nome, path }) => {
          if (path.includes(paths[index])) {
            return { nome, path };
          }
        });
      } else {
        return []
      }
    } else {
      // eslint-disable-next-line
      return acc.filter(({ nome, path }) => {
        if (Path.includes(path)) {
          return { nome, path };
        }
      });
    }

  },[])

  return Acc[Acc.length - 1];

}

export const FileIsExist = async (Imagem) => {

  try {
    const myRequest = new Request(process.env.REACT_APP_ENDPOINT_IMAGES_USER+Imagem);
    const response = await fetch(myRequest);

    if (response.status === 200 && response.ok) {
      return response.url
    }else{
      return false;
    }

  } catch (error) {
    return false;
  }

}

/**
 * Define o novo file name do arquivo
 * @param {String} Filename 
 * @param {String} type
 * @param {String} prefixo 
 */
export const NewFileName = (FileName, type, prefixo) => {

  const uuid = uuidv1();
  let extension = '';

  switch (type) {
    case 'application/pdf':
      extension = '.pdf'
      break;
    case 'image/png':
      extension = '.png';
      break;
    case 'image/jpeg':
      extension = '.jpeg';
      break;
    case 'image/webp':
      extension = '.webp'
      break;
    
    default:
      return;
  }

  return prefixo+uuid+extension
  
}
 
export const getRoleName = (id) => {

  const roles = [
    '','Administrador',
    'Analista',
    'Técnico'
  ]

  return roles[id];

}