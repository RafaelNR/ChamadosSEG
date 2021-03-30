import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import Gravatar from '../Components/Box/Gravatar';
import useUser from "../Hooks/useUser";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    height: 50
  }
}));

const Perfil = () => {
  const classes = useStyles();
  const usuario = useUser();

  return (
    <RouterLink to="/perfil">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        {
          usuario.imagem
            ? <img className={classes.avatar} src={process.env.REACT_APP_ENDPOINT_IMAGES_USER+usuario.imagem} alt={usuario.name} />
            : <Gravatar
                email={usuario.email}
                className={classes.avatar}
              />
        }
        
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {usuario.nome}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {usuario.user}
        </Typography> 
      </Box>
      <Divider />
    </RouterLink>
  );
};


export default Perfil;
