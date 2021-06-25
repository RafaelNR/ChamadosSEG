import React from 'react';
import {
  Avatar,
} from '@material-ui/core';

import Gravatar from '../../Service/gravatar.service';

import { FileIsExist } from '../../Utils/functions'

const MyGravatar = ({ preview=null, imagem=null, email, children,...rest}) => {
  const [src, setSrc] = React.useState('/static/logo.png');

  React.useEffect(() => {
    let render = true;
   
    if (preview) {
      return setSrc(preview)
    }

    (async () => {

      try {
        // Verifica se o arquivo existe;
        if (imagem && (await FileIsExist(imagem))) {
          return setSrc(
            process.env.REACT_APP_ENDPOINT_IMAGES_USER + imagem
          );
        } else if (email) {
          // Busca no gravatar;
          const gravatar = new Gravatar(email);
          const urlImagem = await gravatar.getImage();
          if (render && urlImagem) return setSrc(urlImagem);
        }
        
      } catch (error) {
        console.log(error)
      }

    })(); 




    return function cleanup() {
      render = false;
    };

  },[preview,imagem,email])

  return (
    <Avatar
      src={src}
      {...rest}
    >
      {children}
    </Avatar>
  );
};


export default MyGravatar;
