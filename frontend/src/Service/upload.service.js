import Service from "../Api/Service";


const uploadImageUser = (uploadedFile) => {
  const formData = new FormData();
  formData.append("file", uploadedFile.file, uploadedFile.name);
  formData.append("id", uploadedFile.id);
  
  return Service.Api.post("/uploads/images/user", formData, {
        onUploadProgress: (progressEvent) => {
          
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
            
          console.log(
            `A imagem ${uploadedFile.name} está ${progress}% carregada... `
          );
              
        },
      })
}



export {
  uploadImageUser
}