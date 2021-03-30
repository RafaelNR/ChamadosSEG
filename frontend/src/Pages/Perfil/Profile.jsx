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

import useUser from "../../Hooks/useUser";
import { UploadImage } from '../../Components/Box/Upload'
import Gravatar from '../../Components/Box/Gravatar';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 'auto',
    height: 100,
  },
  user: {
    marginTop: '0.8em',
    marginBottom: 0,
  },
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
          {
            values.imagem
              ? <img className={classes.avatar} src={process.env.REACT_APP_ENDPOINT_IMAGES_USER+values.imagem} alt={values.nome} />
              : <Gravatar
                email={email}
                className={classes.avatar}
              />
          }
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
            className={classes.user}
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
        { values && values.id && <UploadImage type="imagePerfil" id={values.id}/>}
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
