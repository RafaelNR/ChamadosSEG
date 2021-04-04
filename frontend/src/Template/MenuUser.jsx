import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Button, Menu, MenuItem, makeStyles,
  Box,
  Typography,Fade } from '@material-ui/core/';
import Gravatar from '../Components/Box/Gravatar';
import useUser from "../Hooks/useUser";

// Context
import useAuth from "../Context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 64,
    '& .MuiButton-label': {
      height: 64,
    },
    '&:hover': {
      borderRadius: 0,
    },
  },
  menuText: {
    paddingLeft: 10,
    paddingTop: 2,
    color: theme.palette.text.common
  },
  menuIcon:{
    color: theme.palette.text.common
  },
  avatar: {
    cursor: 'pointer',
    height: 30,
    width: 30
  },
  boxUser: {
    color: 'white',
    padding: '15px 10px',
    lineHeight: "normal"
  },
  nome: {
    textTransform: 'capitalize',
    fontSize: 15
  },
  user: {
    textTransform: "capitalize",
    fontSize: 14,
    color: '#ccc'
  }
}));

const User = (props) => {
  const classes = useStyles();
  const usuario = useUser();


  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        p={2}
      >
        <Box
          className={classes.boxUser}
          alignItems="center"
          display="flex"
          flexDirection="column"
          p={2}
        >
          <Typography
            className={classes.nome}
            variant="body1"
            >
            {usuario.nome}
          </Typography>
          <Typography
            className={classes.user}
            variant="body1"
            >
            {usuario.getRoleName()}
          </Typography>
        </Box>
        <Gravatar
          imagem={usuario.imagem}
          email={usuario.email}
          className={classes.avatar}
        />  
      </Box>
    </>
  );
}

export default () => {
  const classes = useStyles();
  const { handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button className={classes.root} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <User />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        TransitionComponent={Fade}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <RouterLink to="/perfil">
          <MenuItem onClick={handleClose}>
            <AccountCircleIcon className={classes.menuIcon} />
            <Typography
            className={classes.menuText}
            variant="body1"
            >
              Perfil
            </Typography>
          </MenuItem>
        </RouterLink>
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon className={classes.menuIcon} />
          <Typography
            className={classes.menuText}
            variant="body1"
            >
              Logout
            </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
