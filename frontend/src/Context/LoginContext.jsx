import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { Login } from '../Service/login.service'

import useLocalStore from "../Hooks/useLocalStore";

const LoginContext = createContext({});

const LoginProvider = ({ children }) => {
  const { getData, setData, removeData } = useLocalStore();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); // TODO Loading
  const [success, setSuccess] = useState(false);
  const [recuperar, setRecuperar] = useState(false);
  const [login, setLogin] = useState({
    user: getData('lembrar'),
    passwd: '',
    lembrar: getData('lembrar') ? true : false,
    permanecer: false,
  });

  const handleLogin = useCallback(() => {
    setLoading(true);
    Login(login)
      .then((Dados) => {
        setErrors([]);
        setLoading(false);

        if (Dados.auth && Dados.token) {
          setData('token', Dados.token); // Seta no local store;
          setData('user', Dados.user); // Seta no local store;
          login.lembrar ? setData('lembrar', Dados.user.user) : removeData('lembrar'); // Seta no localstore;
          setSuccess(true);
          return window.location.replace('/');
        }

        if (Dados.auth && Dados.user) {
          setData('user', Dados.user);
          login.lembrar ? setData('lembrar', Dados.user.user) : removeData('lembrar'); // Seta no localstore;
          setSuccess(true);
          return window.location.replace('/');
        }

        throw new Error('Erro em logar no sistema');
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);

        if (error.errors) return setErrors(error.errors);

        setErrors({
          success: false,
          message:
            error && error.message ? error.message : 'Erro em logar no sistema.'
        });
      });
  }, [login]);

  const handleSubmitLogin = useCallback(
    (e) => {
      e.preventDefault();
      handleLogin(login);
    },
    [login]
  );

  const handleChangeSlide = useCallback(() => {
    setErrors([])
    setLoading(false);
    setSuccess(false);
    setRecuperar((prev) => !prev)
  },[])


  const handleChangeLogin = useCallback((e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLogin((values) => {
      return {
        ...values,
        [name]: value
      };
    });
  }, []);

  const removeErrors = useCallback(
    (e) => {
      if (errors[e.target.name] && errors.hasOwnProperty(e.target.name)) {
        setErrors((errors) => {
          delete errors[e.target.name];
          return errors;
        });
      }
    },
    [login]
  );

  return (
    <LoginContext.Provider
      value={{
        login,
        success,
        errors,
        loading,
        recuperar,
        setErrors,
        removeErrors,
        handleLogin,
        handleSubmitLogin,
        handleChangeLogin,
        handleChangeSlide
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useAuth() {
  return useContext(LoginContext);
}

export { LoginContext, LoginProvider };
