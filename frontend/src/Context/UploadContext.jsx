import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

import * as Service from '../Service/upload.service'
import useLoading from "./LoadingContext";
import useUsuarios from "./UsuariosContext";
import useSnackBar from "./SnackBarContext";


//* HOOK
import useUser from '../Hooks/useUser'

const UploadContext = createContext({});

const UploadProvider = ({ children }) => {
  const { setLoading } = useLoading();
  const { handleSnackBar } = useSnackBar();
  const { setUserImage } = useUsuarios();
  const { setNewImagem } = useUser();
  const [file, setFile] = useState({});
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = React.useState(null);
  const [process, setProcess] = React.useState(null);

  const uploadImageUser = useCallback((uploadedFile) => {
    
    if (uploadedFile.file) {
      Service.uploadImageUser(uploadedFile)
        .then((response) => {

          if (response.data.success) {
            setUserImage(response.data.data);

            return handleSnackBar({
              type: 'success',
              message: `A imagem "${uploadedFile.name}" já foi enviada para o servidor!`
            });
            
          }
        
          throw `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor`;
        
        })
        .catch((error) => {

          handleSnackBar({
            type: 'error',
            message: error 
              ? error
              : `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor;`
            });
          
        })
        
    }
  },[])

  const uploadImagePerfil = useCallback((uploadedFile) => {
    
    if (uploadedFile.file) {
      Service.uploadImageUser(uploadedFile)
        .then((response) => {

          if (response.data.success) {
            setNewImagem(response.data.data.filename)
            handleSnackBar({
              type: 'success',
              message: `A imagem "${uploadedFile.name}" já foi enviada para o servidor!`
            });

            return response.data.data;
            
          }
        
          throw `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor`;
        
        })
        .catch((error) => {

          handleSnackBar({
            type: 'error',
            message: error 
              ? error
              : `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor;`
            });
          
        })
        
    }
  },[])

  const factorUpload = useCallback((type, newFile) => {

    switch (type.toLowerCase()) {
      case 'imageUser'.toLowerCase():
        uploadImageUser(newFile)
        break;
      case 'imagePerfil'.toLowerCase():
        uploadImagePerfil(newFile)
        break;
    
      default:
        break;
    }
  
  },[])
    
  const handleFile = useCallback((type,{File,id}) => {

    if (File) {
      const reader = new FileReader();

      reader.onabort = () => console.log('Abort');
      reader.onerror = () => console.log('error');
      reader.onloadstart = () => setProcess('Start');
      reader.onprogress = () => setProcess('Process');

      reader.onload = () => {
        setProcess('finalizado');

        const newFile = {
          id: id ? id : null,
          file: File,
          name: File.name,
          size: File.size,
          preview: URL.createObjectURL(File),
          process: 0,
          uploaded: false,
          error: false,
          url: ""
        }
        setFile(newFile)
        factorUpload(type, newFile);
        // console.log('file setado: ',reader.result);
      };

      reader.readAsArrayBuffer(File);
    } else {
      handleSnackBar({
        type: 'error',
        message: `Erro em carregar a imagem, verifique o tamanho da imagem.`
      });
    }

  },[])

  return (
    <UploadContext.Provider
      value={{
        file,
        errors,
        handleFile,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default function useUpload() {
  return useContext(UploadContext);
}

UploadProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UploadContext, UploadProvider };
