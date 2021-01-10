import React from "react";

//* COMPONENTES
import {
  makeStyles,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core/";
import { SaveButton, CancelButton } from "../../Components/Buttons/Index";

//* FIELDS
import Fields from "../../Store/CategoriasFields";

//* CONTEXT
import useSubCategorias from "../../Context/SubCategoriasContext";
import useDialog from "../../Context/DialogContext";


const useStyles = makeStyles((theme) => ({
  dialogLoader: {
    width: "500px",
    height: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: 500,
  },
}));

const FormInsert = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({})
  const {
    errors,
    setSubCategoria,
    setErrors,
    handleActions,
  } = useSubCategorias();
  const { type, loading, setLoading, setOpen } = useDialog();

  React.useEffect(() => {
    setSubCategoria({});
    setErrors({});
    setLoading(false);

    return () => {
      return false;
    };
  }, [setErrors, setLoading, setSubCategoria]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, values).then((resp) =>
        resp ? setOpen(false) : setLoading(false)
      );
    },
    [setLoading, setErrors, setOpen, handleActions, type, values]
  );

  const handleChange = React.useCallback(
    (event) => {
      const key = event.target.name;
      const value = event.target.value
      setValues({
        ...values,
        [key]: value,
      });
    },
    [values],
  )

  return (
    <form noValidate onSubmit={handleSubmit} className={classes.form}>
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
              <Grid item xs={12} lg={12} md={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  value={values.nome ? values.nome : ''}
                  id="nome"
                  label="Nome da Sub-Categoria"
                  name="nome"
                  type="text"
                  fullWidth
                  required={true}
                  autoFocus={true}
                  onChange={handleChange}
                  error={errors.nome ? true : false}
                  helperText={errors.nome}
                />
              </Grid>
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
  const [values, setValues] = React.useState({})
  const {
    subcategoria,
    errors,
    setErrors,
    handleActions,
    apiLoading,
  } = useSubCategorias();
  const { type, loading, setLoading, setOpen } = useDialog();


  React.useEffect(() => {
    setValues(subcategoria);
    if (subcategoria && subcategoria.id && !apiLoading) {
      setLoading(false);
    }
  }, [apiLoading, subcategoria, setLoading, setValues]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, values).then((resp) =>
        resp ? setOpen(false) : setLoading(false)
      );
    },
    [handleActions, setLoading, setOpen, setErrors, type, values]
  );

  const handleChange = React.useCallback(
    (event) => {
      const key = event.target.name;
      const value = event.target.value
      setValues({
        ...values,
        [key]: value,
      });
    },
    [values],
  )

  return (
    <form noValidate onSubmit={handleSubmit} className={classes.form}>
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

const FormDelete = () => {
  const { subcategoria, handleActions } = useSubCategorias();
  const { type, closeDialog, setLoading, setOpen } = useDialog();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (handleActions(type, subcategoria)) {
      setOpen(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <h4>Quer realmente deletar a Sub-Categorias, {subcategoria.nome} ?</h4>
      </DialogContent>
      <DialogActions>
        <SaveButton />
        <CancelButton clickClose={closeDialog} />
      </DialogActions>
    </form>
  );
};

export default {
  FormInsert,
  FormUpdate,
  FormDelete,
};
