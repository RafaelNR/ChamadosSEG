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
    setUser(null);
    setToken(null);
    removeData('token');
    removeData('user');
    removeToken();
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let render = true;

    (async () => {
      if (!token || token === 'undefined') {
        process.env.REACT_APP_NODE === 'dev' &&
          console.log('token não encontrado');
        return handleLogout();
      }

      if (!user || user === 'undefined' || !user.nome) {
        process.env.REACT_APP_NODE === 'dev' &&
          console.log('user não encontrado');
        return handleLogout();
      }

      if (render) {
        const resp = await Auth();
        if (!resp.data.auth) return handleLogout();
      }
    })();

    return function cleanup() {
      render = false;
      Crud.default.cancel('AuthContext unmonted');
    };
  }, [token, user,handleLogout]);

  const handleLogin = useCallback(
    ({ user, passwd, lembrar, permanecer }) => {
      setLoading(true);
      Login(user, passwd, permanecer)
        .then((Dados) => {
          setErrors([]);
          setLoading(false);

          if (Dados.auth && Dados.token) {
            setData('token', Dados.token); // Seta no local store;
            setData('user', Dados.user); // Seta no local store;
            lembrar
              ? setData('lembrar', Dados.user.user)
              : removeData('lembrar'); // Seta no localstore;
            setSuccess(true);
            return window.location.replace('/');
          }

          if (Dados.auth && Dados.user) {
            setData('user', Dados.user);
            lembrar
              ? setData('lembrar', Dados.user.user)
              : removeData('lembrar'); // Seta no localstore;
            setSuccess(true);
            return window.location.replace('/');
          }

          throw new Error('Erro em logar no sistema');
        })
        .catch((error) => {
          setLoading(false);

          if (error.errors) return setErrors(error.errors);

          setErrors({
            success: false,
            message:
              error && error.message
                ? error.message
                : 'Erro em logar no sistema.'
          });
        });
    },
    // eslint-disable-next-line
    [setData]
  );

  const handleAuth = useCallback(() => {
    const storageToken = getData('token');
    const storageUser = getData('user');

    if (!storageToken || storageToken === 'undefined') {
      setErrors({
        success: false,
        message:
          'Erro, token de autenticação não encontrado, você foi deslogado!!'
      });
      return handleLogout();
    }

    if (!storageUser || storageUser === 'undefined' || !storageUser.nome) {
      setErrors({
        success: false,
        message: 'Erro, usuário não encontrado, você foi deslogado!'
      });
      return handleLogout();
    }

    Auth().then((resp) => {
      if (!resp.data.auth) {
        setErrors({
          success: false,
          message: 'Autenticação expirou, você foi deslogado!'
        });
        return handleLogout();
      }
    });
  // eslint-disable-next-line
  },[handleLogout])

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
