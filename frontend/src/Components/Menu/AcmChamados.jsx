import React, { useCallback } from 'react';
import {
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@material-ui/core';
import {
  AddCommentRounded,
  AttachFileRounded,
  MessageRounded,
  Save,
  Close,
  MoreVert
} from '@material-ui/icons';

//** CONTEXT
import useAcompanhamentos from '../../Context/AcmChamadoContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20
  },
  button: {
    height: 30,
    width: 30,
    color: 'white',
    '&:hover': {
      background: 'transparent'
    }
  }
}));

export default () => {
  const classes = useStyles();
  const { tipo, setTipo, currID } = useAcompanhamentos();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((e) => {
    setAnchorEl(null);
  }, []);

  const handleNovo = useCallback((tipo) => {
    setTipo(tipo);
    handleClose();
  }, []);

  return (
    <div className={classes.root}>
      <Tooltip title="Adicionar">
        <IconButton
          aria-controls="more-acm"
          aria-haspopup="true"
          onClick={handleClick}
          disabled={tipo > 0 || currID ? true : false}
        >
          <AddCommentRounded />
        </IconButton>
      </Tooltip>
      <Menu
        id="acm-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={() => handleNovo(1)}>
          <ListItemIcon>
            <MessageRounded />
          </ListItemIcon>
          <ListItemText primary="Informação" />
        </MenuItem>
        <MenuItem onClick={() => handleNovo(2)}>
          <ListItemIcon>
            <AttachFileRounded />
          </ListItemIcon>
          <ListItemText primary="Arquivo" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export const MenuAcmActions = ({ tipo }) => {
  const classes = useStyles();
  const { setTipo, InsertAcompanhamento, UpdateAcompanhamento, setCurrID } = useAcompanhamentos();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((e) => {
    setAnchorEl(null);
  }, []);

  const handleFechar = useCallback((e) => {
    setTipo(0);
    setAnchorEl(null);
    setCurrID(null);
  }, []);

  const handleInsert = () => {
    InsertAcompanhamento();
    setAnchorEl(null);
  };

  const handleEdit = () => {
    UpdateAcompanhamento();
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Tooltip title="Ações">
        <IconButton
          aria-controls="actions"
          aria-haspopup="true"
          className={classes.button}
          onClick={handleClick}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        id="acm-actions"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={tipo === 'new' ? handleInsert : handleEdit}>
          <ListItemIcon>
            <Save fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Salvar" />
        </MenuItem>
        <MenuItem onClick={handleFechar}>
          <ListItemIcon>
            <Close fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Fechar" />
        </MenuItem>
      </Menu>
    </div>
  );
}