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

//* PROVIDER
import { UploadProvider } from '../../Context/UploadContext'

//* CONTEXT
import useSnackBar from "../../Context/SnackBarContext";
import useMenu from '../../Context/MenuContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-6rem",
  }
}));

export default () => {
  const classes = useStyles();
  const { handleDrawerClose } = useMenu();
  const { handleSnackBar } = useSnackBar();
  const [values, setValues] = React.useState({});

  React.useEffect(() => {

    handleDrawerClose();

    async function init(){
      try {

        const Dados = await getPerfil();

        if(Dados.success){
          return setValues({
            ...Dados.data,
            passwd: '******'
          })
        }
          
        throw new Error(Dados.message);
        
      } catch (error) {
        handleSnackBar({
          type: "error",
          message: error.message ? error.message : 'Erro em carregar os dados.',
        });
      }

    }

    init();

  },[handleSnackBar,handleDrawerClose])

  return (
    <Container maxWidth="lg" className={classes.root}>
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
          <UploadProvider>
            <Profile values={values}/>
          </UploadProvider>
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
