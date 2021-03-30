import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

import * as Api from "../Api/Service";
import useLoading from "./LoadingContext";
import useUsuarios from "./UsuariosContext";
import useSnackBar from "./SnackBarContext";

const UploadContext = createContext({});

const UploadProvider = ({ children }) => {
  const { setLoading } = useLoading();
  const { handleSnackBar } = useSnackBar();
  const { setUserImage } = useUsuarios();
  const [file, setFile] = useState({});
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = React.useState(null);
  const [process, setProcess] = React.useState(null);

  const uploadFile = useCallback((uploadedFile) => {
    const formData = new FormData();

    if (uploadedFile.file) {
      formData.append("file", uploadedFile.file, uploadedFile.name, uploadedFile.id);
      formData.append("id", uploadedFile.id);
      
      Api.default.Api.post("/uploads/images/user", formData, {
        onUploadProgress: (progressEvent) => {
          
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
            
          console.log(
            `A imagem ${uploadedFile.name} está ${progress}% carregada... `
          );
              
        },
      })
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
    
  const handleFile = useCallback((File,id) => {

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
        uploadFile(newFile)
        // console.log('file setado: ',reader.result);
      };

      reader.readAsArrayBuffer(File);
    } else {
      handleSnackBar({
        type: 'error',
        message: `Erro em carregar a imagem, verifique o tamanho e tamanho da imagem.`
      });
    }

  },[uploadFile])

  return (
    <UploadContext.Provider
      value={{
        file,
        errors,
        handleFile,
        uploadFile,
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
