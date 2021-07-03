import React, { useCallback } from 'react';
import { makeStyles, Button, CircularProgress } from '@material-ui/core/';
import { FlagSharp } from '@material-ui/icons';
import { ArrowIconTooltips } from '../../Components/ToolTip/index';

//** CONTEXT
import useChamados from '../../Context/ChamadosContext';

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

export default ({ type='chamados', status }) => {
  const {
    chamado,
    changePrioridadeChamado,
    changePrioridadeChamados,
  } = useChamados();
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles({
    prioridade: chamado.prioridade
  });

  const handleChangePrioridade = useCallback(async () => {
    setLoading(true);

    if (type === 'chamado') {
      changePrioridadeChamado().then(() => {
        setLoading(false);
      });
    } else {
      changePrioridadeChamados().then(() => {
        setLoading(false);
      });
    }
    
  },[chamado,type])

  return (
    <ArrowIconTooltips
      title={chamado.prioridade ? 'Retirar prioridade' : 'Adicionar prioridade'}
    >
      <Button
        className={classes.prioridade}
        endIcon={
          loading ? (
            <CircularProgress size={20} />
          ) : (
            <FlagSharp className={classes.prioridade_icon} />
          )
        }
        onClick={status !== 'Finalizado' ? handleChangePrioridade : undefined}
      />
    </ArrowIconTooltips>
  );
};
