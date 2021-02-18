import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { Auth, removeToken }  from "../Service/auth.service";
import { Login } from '../Service/login.service'
import * as Crud from '../Api/Crud';

import useLocalStore from "../Hooks/useLocalStore";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { getData, setData, removeData } = useLocalStore();
  const [token, setToken] = useState(getData("token"));
  const [user, setUser] = useState(getData("user"));
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); // TODO Loading
  const [success, setSuccess] = useState(false);

  const handleLogout = useCallback(() => {
    console.log('exec handleLogout')
    setUser(null);
    setToken(null);
    removeData("token");
    removeData("user");
    removeToken();
  }, []);

  useEffect(() => {

    const init = async () => {

      if (!token || token === "undefined") {
        console.log("token não encontrado");
        return handleLogout();
      }

      if (!user || user === "undefined" || !user.nome) {
        console.log("user não encontrado");
        return handleLogout();
      }

      const resp = await Auth();
      if (!resp.data.auth) return handleLogout();

    }

    init();

    return function cleanup() {
      Crud.default.cancel("AuthContext unmonted");
    };

  },[]);

  const handleLogin = useCallback((user, passwd,lembrar) => {

    setLoading(true);
    Login(user, passwd).then((Dados) => {

      setErrors([])
      setLoading(false);

      if(Dados.auth && Dados.token){
        setData("token", Dados.token);
        setData("user", Dados.user);
        lembrar && setData("lembrar", { lembrar: true, user: Dados.user.user });
        setSuccess(true);
        return window.location.replace("/");
      }

      if(Dados.auth && Dados.user){
        setData("user", Dados.user);
        setSuccess(true);
        return window.location.replace("/");
      }

      throw new Error('Erro em logar no sistema');

    }).catch((error) => {
      setLoading(false);
      
      if (error.errors)
        return setErrors(error.errors);
      
      setErrors({
        success: false,
        message: error && error.message ? error.message : 'Erro em logar no sistema.'
      })

    })

    },
    [setData]
  );

  const handleAuth = useCallback(() => {
    
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

    Auth().then(resp => {
      if (!resp.data.auth) {
        setErrors({
          success: false,
          message: 'Autenticação expirou, você foi deslogado!'
        });
        return handleLogout();
      }
    })

  },[])

  return (
    <AuthContext.Provider
      value={{
        logado: Boolean(user),
        user,
        success,
        errors,
        loading,
        setErrors,
        handleLogin,
        handleLogout,
        handleAuth,
      }}
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
