import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';

//* Components
import { SearchOutlined, SendOutlined } from '@material-ui/icons/';
import {
  fade,
  Fade,
  makeStyles,
  CircularProgress,
  IconButton,
  Tooltip,
  InputBase
} from '@material-ui/core';

//* Context
import useSnackBar from '../../Context/SnackBarContext';

//* Service
import { getAtividade } from '../../Service/atividade.service';

//* Hooks
import useUser from '../../Hooks/useUser';

//* Utils
import Masker from '../../Utils/masker';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    color: '#fff'
  },
  margin: {
    marginRight: theme.spacing(2)
  },
  searchIcon: (open) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: open ? fade('#dfdfdf', 0.15) : 'transparent',
    color: '#fff',
    '& button:hover': {
      backgroundColor: open ? 'transparent' : 'rgba(255, 255, 255, 0.08);'
    }
  }),
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    animation: `$animate 0.5s ease-in`,
    backgroundColor: fade('#dfdfdf', 0.15)
  },
  '@keyframes animate': {
    '0%': {
      width: '0%'
    },
    '100%': {
      width: '100%'
    }
  },
  send: {
    width: 50,
    height: 48,
    cursor: 'pointer',
    backgroundColor: fade('#dfdfdf', 0.15),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .icon': {}
  },
  iconLoading: {
    marginRight: 26,
    backgroundColor: fade('#dfdfdf', 0.15)
  }
}));

export const SearchAtividade = () => {
  const [open, setOpen] = useState(false);
  const { history } = useHistory();
  let location = useLocation();
  const { roleID, nome } = useUser();
  const { handleSnackBar } = useSnackBar();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState('');
  const classes = useStyles(open);

  useEffect(() => {
    if (open) setOpen(!open);
    // eslint-disable-next-line
  }, [location]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTicket(Masker(value, name));
  }, []);

  const close = useCallback(() => {
    if (!loading) {
      setOpen((props) => !props);
      setTicket('');
    }
  }, [loading]);

  const handleSend = useCallback(() => {
    setLoading(true);

    getAtividade(ticket)
      .then((atividade) => {
        if (!atividade && !atividade.ticket)
          throw new Error('Atividade não encontrada.');
        if (roleID === 3 && atividade.tecnico !== nome)
          throw new Error('Essa atividade não pertence a você.');

        setOpen(false);
        setTicket('');

        if (roleID <= 2 && atividade.tecnico !== nome) {
          return history.push(`/atividades/view/${atividade.ticket}`);
        } else {
          return history.push(`/atividades/edit/${atividade.ticket}`);
        }
      })
      .catch((err) => {
        console.log(err);
        return handleSnackBar({
          type: 'error',
          message:
            err && err.message ? err.message : 'Erro em pesquisar atividade.'
        });
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [ticket]);

  return (
    <>
      <Tooltip title="Pesquisar Atividade">
        <div className={clsx(open && classes.search, classes.margin)}>
          <div className={classes.searchIcon}>
            <IconButton onClick={close}>
              <SearchOutlined />
            </IconButton>
          </div>
          {open && (
            <Fade in={open}>
              <>
                <InputBase
                  type="search"
                  name="ticket"
                  placeholder="Número do ticket"
                  value={ticket}
                  onChange={handleChange}
                  className={classes.inputInput}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  inputProps={{ 'aria-label': 'search' }}
                  disabled={loading}
                  autoFocus={open}
                />
                {loading ? (
                  <CircularProgress size={24} className={classes.iconLoading} />
                ) : (
                  <>
                    <div className={classes.send}>
                      <SendOutlined
                        className="icon"
                        onClick={handleSend}
                      />
                    </div>
                  </>
                )}
              </>
            </Fade>
          )}
        </div>
      </Tooltip>
    </>
  );
};
