import React, {
  createContext,
  useState,
  useContext,
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
  const [errors, setErrors] = React.useState(null);
  const [process, setProcess] = React.useState(null);

  const uploadImageUser = useCallback((uploadedFile) => {
    setLoading(true);

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

          throw new Error(
            `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor`
          );
        })
        .catch((error) => {
          setErrors(error);
          handleSnackBar({
            type: 'error',
            message:
              error && error.message
                ? error.message
                : `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor;`
          });
        })
        .finally(setLoading(false));
    }
    // eslint-disable-next-line
  },[])

  const uploadImagePerfil = useCallback((uploadedFile) => {
    setLoading(true);

    if (uploadedFile.file) {
      Service.uploadImageUser(uploadedFile)
        .then((response) => {
          if (response.data.success) {
            setNewImagem(response.data.data.filename);
            handleSnackBar({
              type: 'success',
              message: `A imagem "${uploadedFile.name}" já foi enviada para o servidor!`
            });

            return response.data.data;
          }

          throw new Error(
            `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor`
          );
        })
        .catch((error) => {
          handleSnackBar({
            type: 'error',
            message:
              error && error.message
                ? error.message
                : `Houve um problema para fazer upload da imagem "${uploadedFile.name}" no servidor;`
          });
        })
        .finally(setLoading(false));
    }
    // eslint-disable-next-line
  }, [])
  
  const uploadFileChamado = useCallback(async () => {
    try {
      const response = await Service.uploadFileChamado(file);
      if (response.data.success) {
        handleSnackBar({
          type: 'success',
          message: 'Acompanhamento adicionado.'
        });
        return response.data.data;
      }

      throw new Error(
        `Houve um problema para fazer upload do arquivo "${file.newName}" para o servidor`
      );
      
    } catch (error) {
      handleSnackBar({
        type: 'error',
        message:
          error && error.message
            ? error.message
            : `Houve um problema para fazer upload do arquivo  "${file.newName}" para o servidor;`
      });
    }
    // eslint-disable-next-line
  },[file])

  const factorUpload = useCallback((type, newFile) => {
    switch (type.toLowerCase()) {
      case 'imageUser'.toLowerCase():
        uploadImageUser(newFile);
        break;
      case 'imagePerfil'.toLowerCase():
        uploadImagePerfil(newFile);
        break;

      default:
        break;
    }
    // eslint-disable-next-line
  },[])
    
  const handleFile = useCallback((type,{File,id}) => {
    if (File) {
      const reader = new FileReader();

      reader.onabort = () => console.log('Abort');
      reader.onerror = () => console.log('error');
      reader.onloadstart = () => setProcess('Start');
      reader.onprogress = () => setProcess('Process');

      reader.onload = () => {
        setProcess('Finalizado');

        const newFile = {
          id: id ? id : null,
          file: File,
          name: File.name,
          size: File.size,
          preview: URL.createObjectURL(File),
          process: 0,
          uploaded: false,
          error: false,
          url: ''
        };
        setFile(newFile);
        factorUpload(type, newFile);
      };

      reader.readAsArrayBuffer(File);
    } else {
      handleSnackBar({
        type: 'error',
        message: `Erro em fazer o upload. Verifique o tamanho ou tipos aceitos.`
      });
    }
    // eslint-disable-next-line
  },[])

  return (
    <UploadContext.Provider
      value={{
        file,
        setFile,
        errors,
        process,
        setProcess,
        handleFile,
        uploadFileChamado
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
