import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";

import useLocalStore from "../Hooks/useLocalStore";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { getData, removeData } = useLocalStore();
  const [token, setToken] = useState(getData("token"));
  const [user, setUser] = useState(getData("user"));
  const [errors, setErrors] = useState([])

  const handleLogout = useCallback(() => {
    setToken(null)
    setUser(null)
    removeData('token');
    removeData('user');
  }, []);

  // AUTENTICA AÇÕES COM MUDANÇA DE PÁGINA;
  const handleAuth = useCallback(() => {
    const isToken = Boolean(getData('token'));
    const isUser = Boolean(getData('user'));
    const ErrorMsg = getData('ErrorMessage');

    if (!isToken || !isUser || ErrorMsg) {
      setErrors({
        success: false,
        message:
          ErrorMsg ||
          'Autenticação não encontrado, você foi deslogado!'
      });
      return handleLogout();
    }

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
