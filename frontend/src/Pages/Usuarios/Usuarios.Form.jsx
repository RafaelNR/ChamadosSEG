import React, { useState } from "react";

//* COMPONENTES
import {
  makeStyles,
  DialogContent,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core/";
import Select from "../../Components/FormControl/Selects";
import {
  SaveButton,
  CancelButton,
  NavigatorButton,
} from "../../Components/Buttons/Index";
import TransferItems from "../../Components/ListItens/TransferItens";
import DialogActions from "../../Components/Dialog/Action"

//* STORE
import Fields from "../../Store/UsuariosFields";

//* CONTEXT E HOOKS
import useClientes, { ClientesProvider } from "../../Context/ClientesContext";
import useUsuarios from "../../Context/UsuariosContext";
import useDialog from "../../Context/DialogContext";
import useMasker from "../../Hooks/useMasker";

const useStyles = makeStyles(() => ({
  dialogLoader: {
    width: '800px',
    height: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContent: {
    width: '800px'
  }
}));

const itensSelect = [
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

const FormInsert = React.memo(({ changeForm, handleChange, values }) => {
  const { errors, setErrors, setUsuario } = useUsuarios();
  const { setLoading } = useDialog();

  React.useEffect(() => {
    setUsuario({});
    setErrors([]);
    setLoading(false);

  }, [setUsuario, setLoading, setErrors]);

  return (
    <>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {Fields.Insert.map((field) => {
            return (
              <Grid
                item
                xs={field.media && field.media.xs ? field.media.xs : 6}
                lg={field.media && field.media.lg ? field.media.lg : 6}
                md={field.media && field.media.md ? field.media.md : 12}
                sm={field.media && field.media.sm ? field.media.sm : 12}
                key={field.id}
              >
                <TextField
                  variant="filled"
                  margin="normal"
                  value={values[[field.id]] ? values[[field.id]] : ''}
                  id={field.id}
                  label={field.label}
                  name={field.id}
                  type={field.type}
                  fullWidth
                  required={field.required ? true : false}
                  autoFocus={field.autofocus ? true : false}
                  onChange={handleChange}
                  error={errors[field.id] ? true : false}
                  helperText={errors[field.id]}
                />
              </Grid>
            );
          })}
          {/** Seleciona o role_ID */}
          <Grid item xs={6} md={6} sm={6} lg={6}>
            <Select
              required
              title="Selecione o perfil do usuário *"
              handleChange={handleChange}
              id="role_id"
              name="role_id"
              value={values.role_id}
              itens={itensSelect}
              errorText={errors['role_id']}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <NavigatorButton clickAction={changeForm} icon="next" />
      </DialogActions>
    </>
  );
});

const FormUpdate = React.memo(
  ({ handleSubmit, changeForm, handleChange, values }) => {
    const classes = useStyles();
    const { usuario, errors, apiLoading } = useUsuarios();
    const { loading, setLoading } = useDialog();

    React.useEffect(() => {
      if (usuario && usuario.id && !apiLoading) {
        setLoading(false);
      }
    }, [apiLoading, usuario, setLoading]);

    return (
      <form
        noValidate
        onSubmit={handleSubmit}
        className={loading ? classes.dialogLoader : null}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContent dividers>
              <TextField
                name="id"
                id="id"
                value={values.id}
                required
                disabled
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              <Grid container spacing={2}>
                {Fields.Update.map((field) => {
                  return (
                    <Grid
                      item
                      xs={field.media && field.media.xs ? field.media.xs : 6}
                      lg={field.media && field.media.lg ? field.media.lg : 6}
                      md={field.media && field.media.md ? field.media.md : 12}
                      sm={field.media && field.media.sm ? field.media.sm : 12}
                      key={field.id}
                    >
                      <TextField
                        variant="filled"
                        margin="normal"
                        value={
                          values[[field.id]] ? values[[field.id]] : field.value
                        }
                        id={field.id}
                        label={field.label}
                        name={field.id}
                        type={field.type}
                        fullWidth
                        required={field.required ? true : false}
                        autoFocus={field.autofocus ? true : false}
                        onChange={handleChange}
                        error={errors[field.id] ? true : false}
                        helperText={errors[field.id]}
                        disabled={field.disabled ? true : false}
                      />
                    </Grid>
                  );
                })}
                <Grid item xs={6} md={6} sm={6} lg={6}>
                  <Select
                    title="Selecione o perfil do usuário *"
                    handleChange={handleChange}
                    id="role_id"
                    name="role_id"
                    value={values.role_id}
                    itens={itensSelect}
                    errorText={errors['role_id']}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <NavigatorButton clickAction={changeForm} icon="next" />
              <SaveButton />
            </DialogActions>
          </>
        )}
      </form>
    );
  }
);

const FormActivedDisabled = React.memo(({ handleSubmit, values }) => {
  const { type, closeDialog } = useDialog();

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <h4>
          Quer realmente {type === "disabled" ? "desabilitar" : "habilitar"} o
          usuário, {values.nome} ?
        </h4>
      </DialogContent>
      <DialogActions>
        <SaveButton />
        <CancelButton clickClose={closeDialog} />
      </DialogActions>
    </form>
  );
});

const FormClients = React.memo(
  ({ handleSubmit, changeForm, handleClients, values }) => {
    const classes = useStyles();
    const { clientes } = useClientes();
    const { loading } = useDialog();

    const allClients = () => {
      return clientes.map((cliente) => {
        return {
          id: cliente.id,
          nome: cliente.nome_fantasia,
        };
      });
    };

    return (
      <form
        noValidate
        onSubmit={handleSubmit}
        className={loading ? classes.dialogLoader : null}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContent dividers className={classes.dialogContent}>
              <TransferItems
                disponiveis={allClients()}
                selecionados={values.clients}
                setValue={handleClients}
              />
            </DialogContent>
            <DialogActions>
              <NavigatorButton clickAction={changeForm} icon="before"/>
              <SaveButton />
            </DialogActions>
          </>
        )}
      </form>
    );
  }
);

const FactorForm = (props) => {
  const [ currForm, setCurrForm ] = useState(props.currForm);
  const [ nextForm, setNextForm ] = useState("clients");
  const [ values, setValues ] = useState({});
  const { usuario, setErrors, handleActions } = useUsuarios();
  const { type, setLoading, setOpen } = useDialog();
  const { Masker } = useMasker();

  React.useEffect(() => {
    if (type !== "insert") {
      const newClients =
        usuario && usuario.clients
          ? usuario.clients.map((client) => client.id)
          : [];
      setValues({ ...usuario, clients: newClients });
    }
  }, [setValues, usuario, type]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, values).then((resp) => {
        console.log(resp)
        if (resp) {
          setOpen(false);
        } else {
          setLoading(false);
        }
      });
    },
    [setLoading, handleActions, setOpen, setErrors, type, values]
  );

  const changeForm = React.useCallback(() => {
    const form = currForm;
    setCurrForm(nextForm);
    setNextForm(form);
  }, [currForm, nextForm]);

  const handleClients = React.useCallback(
    (action, ID) => {
      // Verifica se o ID já existe como cliente
      let currClients = !values.clients ? [] : values.clients;
      action === "add"
        ? currClients.push(ID)
        : (currClients = currClients.filter((c) => c !== ID));

      // Adiciona o Valor
      setValues({
        ...values,
        clients: currClients,
      });
    },
    [values, setValues]
  );

  const handleChange = React.useCallback(
    (event) => {
      const key = event.target.name;
      const value = Masker(event.target.value, key);
      setValues({
        ...values,
        [key]: value,
      });
    },
    [values, Masker],
  )

  switch (currForm) {
    case "insert":
      return (
        <FormInsert
          changeForm={changeForm}
          handleChange={handleChange}
          values={values}
        />
      );

    case "update":
      return (
        <FormUpdate
          changeForm={changeForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
        />
      );

    case "activeddisabled":
      return (
        <FormActivedDisabled handleSubmit={handleSubmit} values={values} />
      );

    case "clients":
      return (
        <ClientesProvider>
          <FormClients
            changeForm={changeForm}
            handleSubmit={handleSubmit}
            handleClients={handleClients}
            values={values}
          />
        </ClientesProvider>
      );

    default:
      break;
  }
};

export default React.memo(FactorForm);
