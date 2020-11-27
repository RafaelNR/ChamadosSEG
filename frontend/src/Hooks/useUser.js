import { useState, useEffect } from "react";
import useLocalStore from "./useLocalStore";

const useUser = () => {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState();
  const [permission, setPermission] = useState(null);
  const { getData } = useLocalStore();

  useEffect(() => {
    const Dados = getData("user");
    setNome(Dados.nome);
    setUser(Dados.user);
  },[setNome,setUser, getData]);

  return {
    nome,
    user,
    permission,
    setPermission,
  };
};

export default useUser;
