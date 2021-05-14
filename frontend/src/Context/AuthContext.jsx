import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { Auth, removeToken }  from "../Service/auth.service";

import useLocalStore from "../Hooks/useLocalStore";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { getData, removeData } = useLocalStore();
  const [token, setToken] = useState(getData("token"));
  const [user, setUser] = useState(getData("user"));
  const [errors, setErrors] = useState([]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    removeData('token');
    removeData('user');
    removeToken();
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
    };
  }, [token, user,handleLogout]);

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
  },[])

  return (
    <AuthContext.Provider
      value={{
        logado: Boolean(user),
        user,
        errors,
        setErrors,
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
