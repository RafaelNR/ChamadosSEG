import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react';


//* SERVICE
import * as Crud from '../Api/Crud';
import { getClientes } from '../Service/clientes.service';
import { getUsers } from '../Service/user.service';

//* STORE
import { Anos, Meses } from '../Store/Datas';

const ReportAtividadesContext = createContext({});

const ReportAtividadesProvider = ({ children }) => {
  const [type, setType] = useState({
    data: 'periodo', // datas || periodo
    info: 'cliente' // tecnico || cliente
  });
  const [clientes, setClientes] = useState(null);
  const [tecnicos, setTecnicos] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState(null);
  const [download, setDownload] = useState(null);

  useEffect(() => {
    let render = true;
    
    (async () => {

      try {

        const Dados =
          type.info === 'cliente'
            ? await getClientes()
            : await getUsers();

        if (render) {
          if (type.info === 'cliente') {
            const Clientes = Dados.data.map((cliente) => {
              return {
                id: cliente.id,
                nome: cliente.nome_fantasia
              };
            });
            setClientes(Clientes);
          } else {
            setTecnicos(Dados.data);
          }
        }
        
      } catch (error) {
        console.log(error)
      }

    })();

    return function cleanup() {
      render = false;
      Crud.default.cancel('ReportContext unmonted');
    };
    
  }, [type.info]);

  const handleDataChange = useCallback(
    (event) => {
      event.target &&
        setType((t) =>
          event.target.value === 'periodo'
            ? { ...t, data: 'periodo' }
            : { ...t, data: 'datas' }
        );
      setValues({});
    },
    [setType]
  );

  const handleTypeChange = useCallback(
    (event) => {
      event.target &&
        setType((t) =>
          event.target.value === 'cliente'
            ? { ...t, info: 'cliente' }
            : { ...t, info: 'tecnico' }
        );
      setValues({});
    },
    [setType]
  );

  const handleChange = useCallback(
    (event) => {
      const key = event.target.name;
      const value = event.target.value;
      console.log(key,value)
      setValues({
        ...values,
        [key]: value
      });
    },
    [values]
  );

  return (
    <ReportAtividadesContext.Provider
      value={{
        type,
        clientes,
        tecnicos,
        values,
        Anos,
        Meses,
        errors,
        download,
        setDownload,
        setErrors,
        handleChange,
        handleTypeChange,
        handleDataChange
      }}
    >
      {children}
    </ReportAtividadesContext.Provider>
  );
};

export default function useReportAtividades() {
  return useContext(ReportAtividadesContext);
}

export { ReportAtividadesContext, ReportAtividadesProvider };
