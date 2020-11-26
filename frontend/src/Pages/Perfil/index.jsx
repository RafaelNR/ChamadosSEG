import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import ProfileClientes from './ProfileClientes'

import { getPerfil } from '../../Service/user.service';
import useSnackBar from "../../Context/SnackBarContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-6rem",
  }
}));

export default () => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [values, setValues] = React.useState({});

  React.useEffect(() => {

    async function init(){
      const Dados = await getPerfil();
      if(Dados.success){
        setValues({
          ...Dados.data,
          passwd: '******'
        })
      }else{
        handleSnackBar({
          type: "error",
          message: Dados.message ? Dados.message : 'Erro em carregar os dados.',
        });
      }
      return;
    }

    init();

  },[])

  return (
    <Container maxWidth="lg" class={classes.root}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={4}
          md={6}
          xs={12}
        >
          <Profile values={values}/>
          <ProfileClientes Clientes={values.clients} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          <ProfileDetails Dados={values}/>
        </Grid>
      </Grid>
    </Container>
  );
};
