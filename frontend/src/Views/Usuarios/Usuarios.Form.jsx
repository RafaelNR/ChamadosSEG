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
import { UploadImage } from '../../Components/Box/Upload'
import Gravatar from '../../Components/Box/Gravatar';

//* STORE
import Fields from "../../Store/UsuariosFields";

//* CONTEXT
import useUsuarios from "../../Context/UsuariosContext";
import useDialog from "../../Context/DialogContext";
import useUpload  from '../../Context/UploadContext';

//* HOOKS
import useMasker from "../../Hooks/useMasker";

import { getClientes } from '../../Service/clientes.service';

const useStyles = makeStyles(() => ({
  dialogLoader: {
    width: '800px',
    height: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContent: {
    width: '800px',
  },
  avatar: {
    minWidth: 150,
    maxWidth: 200,
    minHeight: 150,
    maxHeight: 180,
    display: 'flex',
    margin: 'auto',
    objectFit: 'contain'
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

const FormInsert = React.memo(({ changeForm, handleChange }) => {
  const { usuario, errors, setErrors } = useUsuarios();
  const { setLoading } = useDialog();

  React.useEffect(() => {
    setErrors([]);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

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
                  value={usuario[[field.id]] || ''}
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
              value={usuario.role_id}
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
  ({ handleSubmit, changeForm, handleChange }) => {
    const classes = useStyles();
    const {
      usuario,
      setUsuario,
      getUsuario,
      errors,
      apiLoading
    } = useUsuarios();

    React.useEffect(() => {
      if (usuario && usuario.id && !apiLoading) {
        const currUser = getUsuario(usuario.id);
        setUsuario({
          ...currUser,
          passwd: '******',
        });
      }
      // eslint-disable-next-line
    }, []);

    return (
      <form
        noValidate
        onSubmit={handleSubmit}
        className={apiLoading ? classes.dialogLoader : null}
      >
        {apiLoading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContent dividers>
              <TextField
                name="id"
                id="id"
                value={usuario.id}
                required
                style={{ display: 'none' }}
                disabled
              />
              <TextField
                name="actived"
                id="actived"
                value={usuario.actived}
                required
                style={{ display: 'none' }}
                disabled
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
                        value={usuario[[field.id]]}
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
                    value={usuario.role_id}
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

const FormActivedDisabled = React.memo(({ handleSubmit }) => {
  const { type, closeDialog } = useDialog();
  const { usuario,setUsuario, usuarios} = useUsuarios();

  React.useEffect(() => {
    setUsuario(usuarios.filter(user => user.id === usuario.id)[0]);
  }, [usuarios]);

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <h4>
          Quer realmente {type === "disabled" ? "desabilitar" : "habilitar"} o
          usuário, {usuario.nome} ?
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
  ({ handleSubmit, changeForm, forms }) => {
    const classes = useStyles();
    const { usuario, setUsuario } = useUsuarios();
    const [clientes, setClientes] = useState([]);

    React.useEffect(() => {
      getClientes().then((resp) => {
        setClientes(
          resp.data.map((cliente) => {
            return {
              id: cliente.id,
              nome: cliente.nome_fantasia
            };
          })
        );
      });
      // eslint-disable-next-line
    },[])

    const handleClients = React.useCallback((action, ID) => {
      // Verifica se o ID já existe como cliente
      let currClients = !usuario.clients ? [] : usuario.clients;
      action === 'add'
        ? currClients.push(ID)
        : (currClients = currClients.filter((c) => c !== ID));

      // Adiciona o Valor
      setUsuario((props) => {
        return {
          ...props,
          clients: currClients
        };
      });
      // eslint-disable-next-line
    }, []);


    return (
      <form
        noValidate
        onSubmit={handleSubmit}
        className={clientes.length <= 0 ? classes.dialogLoader : null}
      >
        {clientes.length <= 0 ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContent dividers className={classes.dialogContent}>
              <TransferItems
                disponiveis={clientes}
                selecionados={usuario.clients}
                setValue={handleClients}
              />
            </DialogContent>
            <DialogActions>
              <NavigatorButton clickAction={changeForm} icon="previous"/>
              {forms === 3 && <NavigatorButton clickAction={changeForm} icon="next" />}
              <SaveButton />
            </DialogActions>
          </>
        )}
      </form>
    );
  }
);

const FormUploadImage = ({ changeForm }) => {
  const classes = useStyles();
  const { usuario } = useUsuarios();
  const { file } = useUpload();

  return (
    <>
      { usuario &&
        <>
        <DialogContent dividers className={classes.dialogContent}>
          <Grid container>
            <Grid item xs={6}>
              <Gravatar
                preview={file && file.preview}
                imagem={usuario.imagem}
                email={usuario.email}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs={6}>
              <UploadImage type="ImageUser" id={usuario && usuario.id}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <NavigatorButton clickAction={changeForm} icon="previous" />
        </DialogActions>
        </>
      }
    </>
  );

}

const FactorForm = (props) => {
  const [currForm, setCurrForm] = useState('');
  const [forms, setForms] = useState([]);
  const { usuario, setUsuario, setErrors, handleActions } = useUsuarios();
  const { type, setLoading, setOpen } = useDialog();
  const { Masker } = useMasker();

  React.useEffect(() => {
    if (type !== 'insert') {
      setCurrForm(props.currForm);
      setForms([props.currForm, 'clientes', 'imagem']);
    } else {
      setUsuario({});
      setCurrForm('insert');
      setForms([props.currForm, 'clientes']);
    }
    // eslint-disable-next-line
  }, [type]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, usuario).then((resp) => {
        if (resp) {
          setOpen(false);
        } else {
          setLoading(false);
        }
      });
    },
    // eslint-disable-next-line
    [type, usuario]
  );

  const handleChange = React.useCallback(
    (event) => {
      const name = event.target.name;
      const value = Masker(event.target.value, name);
      setUsuario((props) => {
        return {
          ...props,
          [name]: value
        };
      });
    },
    // eslint-disable-next-line
    []
  );

  const changeForm = React.useCallback((type=null) => {
    if (type === 'next') {
      const index = forms.indexOf(currForm);
      setCurrForm(forms[index + 1]);
    } else {
      const index = forms.indexOf(currForm);
      setCurrForm(forms[index - 1]);
    }
    // eslint-disable-next-line
  },[currForm])

  switch (currForm) {
    case "insert":
      return (
        <FormInsert
          changeForm={changeForm}
          handleChange={handleChange}
        />
      );

    case "update":
      return (
        <FormUpdate
          changeForm={changeForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      );

    case "activeddisabled":
      return (<FormActivedDisabled handleSubmit={handleSubmit} />);
        
    case "imagem":
      return (<FormUploadImage changeForm={changeForm}/>);

    case "clientes":
      return (
          <FormClients
            changeForm={changeForm}
            handleSubmit={handleSubmit}
            forms={forms.length}
          />
      );

    default:
      break;

  };
}

export default React.memo(FactorForm);
