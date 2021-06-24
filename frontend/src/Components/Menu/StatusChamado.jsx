import React, { useCallback } from 'react';
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@material-ui/core';
import {
  LockOpenSharp,
  PlayArrowSharp,
  PauseSharp,
  DoneAllSharp
} from '@material-ui/icons';
import ChipStatus from '../Chip/status';

//* SERVICE
import { changeStatus } from '../../Service/chamados.service';

//** CONTEXT
import useChamados from '../../Context/ChamadosContext';
import useSnackBar from '../../Context/SnackBarContext';


const Status = [
  {
    id: 0,
    status: 'Aberto',
    Icon: LockOpenSharp
  },
  {
    id: 1,
    status: 'Em Andamento',
    Icon: PlayArrowSharp
  },
  {
    id: 2,
    status: 'Pendente',
    Icon: PauseSharp
  },
  {
    id: 3,
    status: 'Finalizado',
    Icon: DoneAllSharp
  }
];

const getStatus = (currStatus) => {
  const curr = Status.filter((s) => s.status === currStatus );
  return Status.filter((s) => s.status !== curr[0].status && s.id >= curr[0].id)
}

const useStyles = makeStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'transparent'
    },
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}));

export default ({ status, disabled=false }) => {
  const classes = useStyles();
  const { chamado, setChamado } = useChamados();
  const { handleSnackBar } = useSnackBar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [AllStatus, setAllStatus] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setAllStatus(getStatus(status));
  }, [status])

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [])

  const handleChangeStatusChamado = useCallback(
    async (event) => {
      setLoading(true);
      const newStatus = event.target.innerText;
      try {
        if (newStatus) {
          const Dados = await changeStatus(chamado.id, newStatus);
          if (Dados.success) {
            handleSnackBar({
              type: 'success',
              message: 'Status alterado.'
            });
            setChamado({
              ...chamado,
              status: newStatus
            });
          }
        }
      } catch (error) {
        handleSnackBar({
          type: 'error',
          message: error && error.message ? error.message : 'Erro em alterar o status.'
        });
      } finally {
        setLoading(false);
      }
    },
    [chamado]
  );
  
  return (
    <>
      {status !== 'Finalizado' ? (
        <Tooltip title="Click para alterar status" placement="top">
          <div>
            <Button
              aria-controls="status-menu"
              aria-haspopup="true"
              onClick={handleClick}
              disabled={loading || disabled}
              className={classes.root}
            >
              <ChipStatus status={status} loading={loading} />
            </Button>
            <Menu
              id="status-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleChangeStatusChamado}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              {AllStatus &&
                AllStatus.map(({ id, status, Icon }) => {
                  return (
                    <MenuItem key={id} onClick={handleClose}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={status} />
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
        </Tooltip>
      ) : (
        <Button
          aria-controls="status-menu"
          aria-haspopup="true"
          onClick={handleClick}
          disabled={true}
          className={classes.root}
        >
            <ChipStatus status={status} />
        </Button>
      )}
    </>
  );
}
