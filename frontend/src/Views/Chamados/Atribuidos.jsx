import React, { useEffect } from 'react';
import BoxChamado from '../../Components/Box/Chamado';
import Loading from '../../Components/Loading';

//* SERVICE
import {
  getChamadosAtribuidosFromMe,
  getCountTypeAcompanhamentos
} from '../../Service/chamados.service';

//** CONTEXT
import useChamados from '../../Context/ChamadosContext';
import useSnackBar from '../../Context/SnackBarContext';
import useLoading from '../../Context/LoadingContext';


const getChamados = async () => {
  try {
    const Chamados = await getChamadosAtribuidosFromMe();
    const Acms = await getCountTypeAcompanhamentos();

    if (Chamados.success && Acms.success) {
      return Chamados.data.map((chamado) => {
        const t = Acms.data.filter((acm) => chamado.id === acm.chamado_id);

        if (t.length >= 1) {
          return {
            ...chamado,
            ...t[0]
          };
        } else {
          return chamado;
        }
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default () => {
  const { chamados, setChamados } = useChamados();
  const { handleSnackBar } = useSnackBar();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    let render = true;
    (async () => {
      try {
        setLoading(true);
        const Dados = await getChamados();
        if (render) setChamados(Dados);
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message: (error && error.message) || 'Erro em carregar chamados.'
        });
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      return false;
    };
  }, []);

  return (
    <>
      { loading ? <Loading /> : 
        
          chamados.map((chamado) => {
            return <BoxChamado key={chamado.id} chamado={chamado} />
          })
        
      }
    </>
  )
  
};
