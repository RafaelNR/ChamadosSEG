import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core/';
import { AddOutlined, AddComment, PlaylistAdd } from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    color: 'white'
  },
  link: {
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'inline-flex',
    minWidth: 56,
    flexShrink: 0
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'inline-flex',
    minWidth: 40,
    flexShrink: 0,
    alignItems: 'center',
  }
}));

export default () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        component="span"
        className={classes.root}
      >
        <AddOutlined />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link
            onClick={handleClose}
            className={classes.link}
            to="/atividades/create"
          >
            <ListItemIcon className={classes.icon}>
              <PlaylistAdd fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Nova Atividade" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            onClick={handleClose}
            className={classes.link}
            to="/chamado/create"
          >
            <ListItemIcon className={classes.icon}>
              <AddComment fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Novo Chamado" />
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
