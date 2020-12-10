import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

import Gravatar from '../../Components/Box/Gravatar';
import useUser from "../../Hooks/useUser";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 80,
    width: 80
  }
}));

const Roles = [
  {
    id: 1,
    nome: "Administrador",
  },
  {
    id: 2,
    nome: "Analista",
  },
  {
    id: 3,
    nome: "Técnico",
  },
];

const Profile = ({values}) => {
  const classes = useStyles();
  const { email } = useUser();

  const getRole = () => {
    const Role = Roles.filter(Role => Role.id === values.role_id ? Role : null);
    return Role[0].nome;
  }

  return (
    <Card
      className={classes.root}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Gravatar
            email={email}
            className={classes.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
          >
            {values && values.nome}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            { values && values.role_id && getRole() }
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Alterar Avatar
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
