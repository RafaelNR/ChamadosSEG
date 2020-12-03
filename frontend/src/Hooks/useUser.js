import { useState, useEffect } from "react";
import useLocalStore from "./useLocalStore";

const useUser = () => {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState("");
  const [roleID, setRoleID] = useState(null)
  const [permission, setPermission] = useState(null);
  const { getData } = useLocalStore();

  useEffect(() => {
    const Dados = getData("user");
    setNome(Dados.nome);
    setUser(Dados.user);
    setRoleID(Dados.role_id)
  }, [setNome, setUser, getData]);
  

  return {
    nome,
    user,
    permission,
    roleID,
    setPermission,
  };
};

export default useUser;
