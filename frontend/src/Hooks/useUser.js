import { useState, useEffect, useCallback } from "react";
import useLocalStore from "./useLocalStore";

const useUser = () => {
  const [userDados, setUserDados] = useState({});
  const [nome, setNome] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [imagem, setImagem] = useState("");
  const [roleID, setRoleID] = useState(null);
  const [permission, setPermission] = useState(null);
  const { getData,setData } = useLocalStore();

  useEffect(() => {
    const Dados = getData('user');
    if (Dados) {
      setUserDados(Dados);
      setNome(Dados.nome);
      setUser(Dados.user);
      setRoleID(Dados.role_id);
      setEmail(Dados.email);
      setImagem(Dados.imagem); 
    }
    // eslint-disable-next-line
  }, []);

  const setNewImagem = useCallback((imagem) => {
    const User = getData('user');
    setData('user', {
      ...User,
      imagem
    });
    // eslint-disable-next-line
  },[])

  const getRoleName = useCallback(() => {
    const roles = ['', 'Administrador', 'Analistá', 'Técnico',]
    return roles[roleID];
  },[roleID])
  

  return {
    userDados,
    nome,
    user,
    email,
    permission,
    roleID,
    imagem,
    setPermission,
    setNewImagem,
    getRoleName
  };
};

export default useUser;
