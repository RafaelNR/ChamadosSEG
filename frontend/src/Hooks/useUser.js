import { useState, useEffect } from "react";


const useUser = () => {
  const [nome, setNome] = useState('');
  const [user, setUser] = useState();
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const Dados = JSON.parse(localStorage.getItem('user'));
    setNome(Dados.nome);
    setUser(Dados.user);
  }, [])

  return {
    nome,
    user,
    permission,
    setPermission
  }
  
} 

export default useUser;