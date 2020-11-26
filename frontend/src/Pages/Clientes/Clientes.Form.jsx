import React from "react";
import {
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  CircularProgress,
  makeStyles,
} from "@material-ui/core/";
import Fields from "../../Store/ClientesFields";
import { SaveButton, CancelButton } from "../../Components/Buttons/Index";

//* CONTEXT E HOOKS
import useClientes from "../../Context/ClientesContext";
import useDialog from "../../Context/DialogContext";
import useForm from "../../Hooks/useForm";

const useStyles = makeStyles(() => ({
  dialogLoader: {
    width: "800px",
    height: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const FormInsert = () => {
  const classes = useStyles();
  const { errors, setCliente, setErrors, handleActions } = useClientes();
  const { type, loading, setLoading, setOpen } = useDialog();
  const { values, handleChange } = useForm();

  React.useEffect(() => {
    setCliente({});
    setErrors({});
    setLoading(false);
    // react-hooks/exhaustive-deps
  }, []);

  /**
   ** Quando clica no button que faz a action
   */
  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();

      setLoading(true);
      setErrors(false);
      handleActions(type, values).then((resp) => {
        console.log(resp);
        if (resp) {
          setOpen(false);
        } else {
          setLoading(false);
        }
      });
    },
    [setLoading, handleActions, setOpen, setErrors, type, values]
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogContent
            dividers
            className={loading ? classes.dialogLoader : null}
          >
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
                      value={values[[field.id]] ? values[[field.id]] : ""}
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <SaveButton />
          </DialogActions>
        </>
      )}
    </form>
  );
};

const FormUpdate = () => {
  const classes = useStyles();
  const {
    cliente,
    errors,
    setErrors,
    handleActions,
    apiLoading,
  } = useClientes();
  const { type, loading, setLoading, setOpen } = useDialog();
  const { values, setValues, handleChange } = useForm();

  /**
   ** Seta os valores quando inicia a form.
   */
  React.useEffect(() => {
    setValues(cliente);
    return () => {
      return;
    };
  }, [setValues, cliente]);

  /**
   ** Quando termina de carregar o get, remove o loading
   */
  React.useEffect(() => {
    console.log(cliente);
    if (cliente && cliente.id && !apiLoading) {
      setLoading(false);
    }
  }, [apiLoading, cliente, setLoading]);

  /**
   ** Quando clica no button que faz a action
   */
  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, values).then((resp) => {
        if (resp) {
          setOpen(false);
        } else {
          setLoading(false);
        }
      });
    },
    [handleActions, setLoading, setOpen, setErrors, type, values]
  );

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
              style={{ display: "none" }}
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <SaveButton />
          </DialogActions>
        </>
      )}
    </form>
  );
};

const FormActivedDisabled = () => {
  const { cliente, handleActions } = useClientes();
  const { type, closeDialog, setLoading, setOpen } = useDialog();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (handleActions(type, cliente)) {
      setOpen(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <h4>
            Quer realmente {type === "disabled" ? "desabilitar" : "habilitar"} o
            cliente, {cliente.nome_fantasia} ?
          </h4>
        </form>
      </DialogContent>
      <DialogActions>
        <SaveButton />
        <CancelButton clickClose={closeDialog} />
      </DialogActions>
    </>
  );
};

export { FormInsert, FormUpdate, FormActivedDisabled };
