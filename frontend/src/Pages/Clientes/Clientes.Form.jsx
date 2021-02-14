import React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  CircularProgress,
  makeStyles,
} from "@material-ui/core/";
import Fields from "../../Store/ClientesFields";
import { SaveButton, CancelButton } from "../../Components/Buttons/Index";
import DialogActions from '../../Components/Dialog/Action';


//* CONTEXT E HOOKS
import useClientes from "../../Context/ClientesContext";
import useDialog from "../../Context/DialogContext";
import useMasker from "../../Hooks/useMasker";

const useStyles = makeStyles(() => ({
  dialogLoader: {
    width: "800px",
    height: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const FormInsert = ({ handleChange, handleSubmit, values }) => {
  const classes = useStyles();
  const { errors, setCliente, setErrors } = useClientes();
  const { loading, setLoading } = useDialog();

  React.useEffect(() => {
    setCliente({});
    setErrors({});
    setLoading(false);
  }, [setCliente,setErrors,setLoading]);

  return (
    <form noValidate onSubmit={handleSubmit}>
      {loading ? (
        <div className={classes.dialogLoader}>
          <CircularProgress />
        </div>
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

const FormUpdate = ({ handleChange, handleSubmit, values}) => {
  const classes = useStyles();
  const { cliente, errors, apiLoading } = useClientes();
  const { loading, setLoading } = useDialog();
  
  React.useEffect(() => {
    if (cliente && cliente.id && !apiLoading) {
      setLoading(false);
    }
  }, [apiLoading, cliente, setLoading]);

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

const FormActivedDisabled = ({ handleSubmit }) => {
  const { cliente } = useClientes();
  const { type, closeDialog } = useDialog();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
            <h4>
              Quer realmente {type === "disabled" ? "desabilitar" : "habilitar"} o
              cliente, {cliente.nome_fantasia} ?
            </h4>
        </DialogContent>
        <DialogActions>
          <SaveButton />
          <CancelButton clickClose={closeDialog} />
        </DialogActions>
      </form>
    </>
  );
};

export default () => {
  const [ values, setValues ] = React.useState({});
  const { type, setLoading, setOpen } = useDialog();
  const { cliente, setErrors, handleActions } = useClientes();
  const { Masker } = useMasker();

  React.useEffect(() => {
    setValues(cliente);  
  }, [setValues,cliente]);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      setLoading(true);
      setErrors(false);

      console.log('submit')

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

  const handleChange = React.useCallback(
    (event) => {
      const key = event.target.name;
      const value = Masker(event.target.value, key);
      setValues({
        ...values,
        [key]: value,
      });
    },
    [values, Masker]
  );

  switch (type) {
    case "insert":
      return (
        <FormInsert
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
        />
      );

    case "update":
      return (
        <FormUpdate
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
        />
      );

    case "disabled":
    case "actived":
      return (
        <FormActivedDisabled handleSubmit={handleSubmit} />
      );

    default:
      return <></>;
  }

}