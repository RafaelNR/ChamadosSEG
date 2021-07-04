import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';

import Loading from '../../Components/Loading'

import useForm from '../../Hooks/useForm';
import useSnackBar from "../../Context/SnackBarContext";
import { updatePerfil } from '../../Service/user.service';
import PerfilSchema from '../../Schemas/Perfil.schema';

const useStyles = makeStyles(() => ({
  root: {}
}));

export default ({ user }) => {
  const classes = useStyles();
  const { handleChangeValues, values, setValues } = useForm();
  const { handleSnackBar } = useSnackBar();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (user && user.nome) setValues(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])


  const handleSubmit = async () => {
    setLoading(true)

    const Dados = await PerfilSchema(values);
    if(Dados.error) return setErrors(Dados.errors)

    return updatePerfil(Dados).then(Dados => {
      setValues({
        ...Dados.data,
        passwd: '******'
      });
      handleSnackBar({
        type: "success",  
        message: 'Dados Atualizados!',
      });
    }).catch(error => {
      console.log(error)
      handleSnackBar({
        type: "error",
        message: error.message ? error.message : 'Erro em carregar os dados.',
      });
    }).finally(() => {
      setLoading(false);
    })

  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
    >
      <Card>
        <CardHeader
          subheader=""
          title="Meus Dados"
        />
        <Divider />
        { !loading && values && values.nome ? 
          (
            <>
              <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    name="nome"
                    id="nome"
                    onChange={handleChangeValues}
                    value={values.nome}
                    variant="outlined"
                    error={errors["nome"] ? true : false}
                    helperText={errors["nome"]}
                    required
                    />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Usuário"
                    name="user"
                    onChange={handleChangeValues}
                    value={values.user}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    type="password"
                    label="Senha"
                    name="passwd"
                    onChange={handleChangeValues}
                    value={values.passwd}
                    variant="outlined"
                    error={errors["passwd"] ? true : false}
                    helperText={errors["passwd"]}
                    required
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChangeValues}
                    value={values.email}
                    variant="outlined"
                    error={errors["email"] ? true : false}
                    helperText={errors["email"]}
                    required
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="telefone"
                    onChange={handleChangeValues}
                    value={values.telefone}
                    variant="outlined"
                    error={errors["telefone"] ? true : false}
                    helperText={errors["telefone"]}
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              p={2}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Salvar
              </Button>
            </Box>
          </>
          )
        
        : <CardContent><Loading /></CardContent>}
      </Card>
    </form>
  );
};

