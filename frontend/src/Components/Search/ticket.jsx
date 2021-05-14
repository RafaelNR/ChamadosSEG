import React, {useCallback, useEffect, useState} from 'react';
import clsx from 'clsx'
import { useHistory, useLocation } from 'react-router-dom';

//* Components 
import { SearchOutlined, SendOutlined } from '@material-ui/icons/';
import {
  fade,
  Grow,
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
import useUser from '../../Hooks/useUser'

//* Utils
import Masker from '../../Utils/masker'

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#dfdfdf', 0.15),
    transition: theme.transitions.create('width'),
    marginLeft: 0,
    width: '100%',
    color: '#fff'
  },
  margin: {
    marginRight: theme.spacing(2)
  },
  searchIcon: (open) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    '& button:hover': {
      backgroundColor: open ? 'transparent' : 'rgba(255, 255, 255, 0.08);'
    }
  }),
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  iconSend: {
    width: 50,
    height: 25,
    cursor: 'pointer'
  },
  iconLoading: {
    marginRight: 26
  }
}));

export const SearchAtividade = ({}) => {
  const [open, setOpen] = useState(false);
  const { history } = useHistory();
  let location = useLocation();
  const { roleID, nome} = useUser();
  const { handleSnackBar } = useSnackBar();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState('');
  const classes = useStyles(open);

  useEffect(() => {
    if(open) setOpen(!open);
  },[location])

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTicket(Masker(value, name));
  }, []);

  const close = useCallback(() => {
    if (!loading) {
      setOpen((props) => !props);
      setTicket('')
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
        <div className={clsx(classes.margin, open && classes.search)}>
          <div className={classes.searchIcon}>
            <IconButton onClick={close}>
              <SearchOutlined className={classes.searchIcon}/>
            </IconButton>
          </div>
          {open && (
            <Grow in={open}>
              <>
                <InputBase
                  type="search"
                  name="ticket"
                  placeholder="Número do ticket"
                  value={ticket}
                  onChange={handleChange}
                  onKeyPress={(e) => e.key === 'Enter' &&  handleSend()}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  disabled={loading}
                  autoFocus={open}
                />
                {loading ? (
                  <CircularProgress size={24} className={classes.iconLoading} />
                ) : (
                  <SendOutlined
                    className={classes.iconSend}
                    onClick={handleSend}
                  />
                )}
              </>
            </Grow>
          )}
        </div>
      </Tooltip>
    </>
  );
};
