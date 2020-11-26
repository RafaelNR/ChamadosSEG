import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

import useUser from "../Hooks/useUser";

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

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
    width: 64,
    height: 64
  }
}));

const Perfil = () => {
  const classes = useStyles();
  const usuario = useUser();

  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/perfil"
        />
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
    </>
  );
};


export default Perfil;
