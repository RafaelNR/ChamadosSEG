import PropTypes from "prop-types";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import * as Auth from "../Api/Auth";
import { Login } from '../Service/login.service'

import useLocalStore from "../Hooks/useLocalStore";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { getData, setData, removeData } = useLocalStore();
  const [token, setToken] = useState(getData("token"));
  const [user, setUser] = useState(getData("user"));
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    return async () => {

      if (!token || token === "undefined") {
        console.log("token não encontrado");
        return handleLogout();
      }

      if (!user || user === "undefined" || !user.nome) {
        console.log("user não encontrado");
        return handleLogout();
      }

      const resp = await Auth.Auth();
      if (!resp.data.auth) return handleLogout();

    }

  },[]);


  const handleLogin = useCallback((user, passwd) => {

      Login(user, passwd).then((Dados) => {

        setErrors([])

        if(Dados.auth && Dados.token){
          setData("token", Dados.token);
          setData("user", Dados.user);
          return window.location.replace("/");
        }

        if(Dados.auth && Dados.user){
          setData("user", Dados.user);
          return window.location.replace("/");
        }

        throw {
          success: false,
          message: 'Erro em logar no sistema'
        }

      }).catch((error) => {
        if(error.error){
          return setErrors(error.errors)
        }
        setErrors(error)

      })

    },
    [setData]
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    removeData("token");
    removeData("user");
    Auth.removeToken();
  }, [removeData]);


  const handleAuth = useCallback(async () => {
    
    const storageToken = getData("token")
    const storageUser = getData("user")

    if (!storageToken || storageToken === "undefined") {
      setErrors({
        success: false,
        message: 'Erro, token de autenticação não encontrado, você foi deslogado!!'
      });
      return handleLogout();
    }

    if (!storageUser || storageUser === "undefined" || !storageUser.nome) {
      setErrors({
        success: false,
        message: 'Erro, usuário não encontrado, você foi deslogado!'
      });
      return handleLogout();
    }

    const resp = await Auth.Auth();
    if (!resp.data.auth) {
      setErrors({
        success: false,
        message: 'Autenticação expirou, você foi deslogado!'
      });
      return handleLogout();
    }

  },[handleLogout])

  return (
    <AuthContext.Provider
      value={{ logado: Boolean(user), user, handleLogin, handleLogout, errors, loading, handleAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext, AuthProvider };
