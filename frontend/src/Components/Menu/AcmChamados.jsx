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
  Remove,
  MoreVert,
} from '@material-ui/icons';

//** CONTEXT
import useAcompanhamentos from '../../Context/AcmChamadoContext';
import useUpload from '../../Context/UploadContext';

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

export const MenuAcmActions = ({ tipoMenu, id=null }) => {
  const classes = useStyles();
  const {
    setTipo,
    InsertAcompanhamento,
    UpdateAcompanhamento,
    DeleteAcompanhamento,
    setCurrID
  } = useAcompanhamentos();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((e) => {
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

  const handleDelete = () => {
    DeleteAcompanhamento(id);
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
      {tipoMenu === 'deletar' ? (
        <Menu
          id="acm-actions"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={1}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Remove fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Deletar" />
          </MenuItem>
        </Menu>
      ) : tipoMenu === 'edit' ? (
        <Menu
          id="acm-actions"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={1}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Save fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Salvar" />
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Remove fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Deletar" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Close fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Fechar" />
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="acm-actions"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={1}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleInsert}>
            <ListItemIcon>
              <Save fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Salvar" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Close fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Fechar" />
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export const MenuAcmActionsUpload = () => {
  const classes = useStyles();
  const { file, setFile, uploadFileChamado } = useUpload();
  const {
    setTipo,
    setCurrID,
    setAcompanhamentos
  } = useAcompanhamentos();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = useCallback((event) => {/*  */
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((e) => {
    setTipo(0);
    setAnchorEl(null);
    setCurrID(null);
  }, []);

  const handleRemoverFile = useCallback((e) => {
    setFile({});
    setAnchorEl(null);
    setTipo(0);
  }, []);

  const handleInsertFile = async () => {
    const resp = await uploadFileChamado();
    setAcompanhamentos(acms => [resp,...acms])
    setTipo(0);
    setAnchorEl(null);
    setCurrID(null);
  } 

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
      {file && file.name ? (
        <Menu
          id="acm-actions"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={1}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleInsertFile}>
            <ListItemIcon>
              <Save fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Salvar" />
          </MenuItem>
          <MenuItem onClick={handleRemoverFile}>
            <ListItemIcon>
              <Remove fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Remover" />
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="acm-actions"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={1}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleRemoverFile}>
            <ListItemIcon>
              <Remove fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Remover" />
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};