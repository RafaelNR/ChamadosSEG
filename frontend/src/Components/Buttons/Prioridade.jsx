import React, { useCallback } from 'react';
import { makeStyles, Button, CircularProgress } from '@material-ui/core/';
import { FlagSharp, TrainRounded } from '@material-ui/icons';
import { ArrowIconTooltips } from '../../Components/ToolTip/index';

//* SERVICE
import { changePrioridade } from '../../Service/chamados.service';

//** CONTEXT
import useChamados from '../../Context/ChamadosContext';
import useSnackBar from '../../Context/SnackBarContext';

const useStyles = makeStyles((theme) => ({
  prioridade: {
    height: 40,
    minWidth: 40,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '& .MuiButton-endIcon': {
      marginLeft: 0,
      marginRight: 0
    }
  },
  prioridade_icon: (props) => ({
    color: theme.darkMode
      ? props.prioridade
        ? 'red'
        : '#f9f9f9'
      : props.prioridade
      ? 'red'
      : '#404040'
  })
}));

export default ({ type='chamados' }) => {
  const { chamado, setChamado, chamados,setChamados } = useChamados();
  const classes = useStyles({
    prioridade: chamado.prioridade
  });
  const { handleSnackBar } = useSnackBar();
  const [loading, setLoading] = React.useState(false);

  const handleChangePrioridade = useCallback(async () => {
    try {
      setLoading(true);

      const newPrioridade = !chamado.prioridade ? 1 : 0;
      const Dados = await changePrioridade(chamado.id, newPrioridade);
      if (Dados.success) {
        if (type === 'chamados') {
          const newChamados = chamados.map((c) => {
            if (c.id === chamado.id) {
              return {
                ...chamado,
                prioridade: newPrioridade
              };
            }
            return chamado;
          });
          return setChamados(newChamados);
        } else {
          return setChamado({
            ...chamado,
            prioridade: newPrioridade
          });
        }
      }
    } catch (error) {
      handleSnackBar({
        type: 'error',
        message: 'Erro em alterar a prioridade.'
      });
    } finally {
      setLoading(false);
    }
  },[chamado])

  return (
    <ArrowIconTooltips
      title={chamado.prioridade ? 'Retirar prioridade' : 'Adicionar prioridade'}
    >
      <Button
        className={classes.prioridade}
        endIcon={ loading ? <CircularProgress size={20} /> : <FlagSharp className={classes.prioridade_icon} />}
        onClick={handleChangePrioridade}
      />
    </ArrowIconTooltips>
  );
};
