import { useState, useEffect, useCallback } from "react";
import useLocalStore from "./useLocalStore";

const useUser = () => {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [imagem, setImagem] = useState("");
  const [roleID, setRoleID] = useState(null)
  const [permission, setPermission] = useState(null);
  const { getData,setData } = useLocalStore();

  useEffect(() => {
    const Dados = getData("user");
    setNome(Dados.nome);
    setUser(Dados.user);
    setRoleID(Dados.role_id);
    setEmail(Dados.email);
    setImagem(Dados.imagem);
  }, [setNome, setUser, getData]);

  const setNewImagem = useCallback((imagem) => {
    const User = getData("user");
    console.log(User,imagem)
    setData('user', {
      ...User,
      imagem,
    })

  },[])
  

  return {
    nome,
    user,
    email,
    permission,
    roleID,
    imagem,
    setPermission,
    setNewImagem,
  };
};

export default useUser;
