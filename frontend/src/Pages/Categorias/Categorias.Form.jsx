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
import TransferItems from "../../Components/ListItens/TransferItens";
import { SaveButton, CancelButton } from "../../Components/Buttons/Index";

//* FIELDS
import Fields from "../../Store/CategoriasFields";

//* CONTEXT
import useCategorias from "../../Context/CategoriasContext";
import useSubCategorias from "../../Context/SubCategoriasContext";
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
  const { errors, setCategoria, setErrors, handleActions } = useCategorias();
  const { subcategorias } = useSubCategorias();
  const { type, loading, setLoading, setOpen } = useDialog();
  const { values, setValues, handleChange } = useForm();

  React.useEffect(() => {
    setCategoria({});
    setErrors({});
    setLoading(false);

    return () => {
      return false;
    };
    // react-hooks/exhaustive-deps
  }, []);

  /**
   ** Quando clica no button que faz a action envia.
   */
  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, values).then((resp) =>
        resp ? setOpen(false) : setLoading(false)
      );
    },
    [setLoading, handleActions, setOpen, setErrors, type, values]
  );

  /**
   ** Recebe uma action, add ou remove uma subcategoria no values corrente.
   * @param {string} action
   * @param {number} ID
   */
  const handleSubCategoria = React.useCallback(
    (action, ID) => {
      // Verifica se o values já tem subcategoria
      let currSubCategorias = !values.subCategorias ? [] : values.subCategorias;
      if (action === "add") {
        currSubCategorias.push(ID);
      } else {
        currSubCategorias = currSubCategorias.filter((c) => c !== ID);
      }

      //& Adiciona o Valor
      setValues({
        ...values,
        subCategorias: currSubCategorias,
      });
    },
    [values, setValues]
  );

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
              {
                <TransferItems
                  disponiveis={subcategorias}
                  selecionados={null}
                  setValue={handleSubCategoria}
                />
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <SaveButton
              disabled={
                subcategorias && subcategorias.length > 0 ? false : true
              }
            />
          </DialogActions>
        </>
      )}
    </form>
  );
};

const FormUpdate = () => {
  const classes = useStyles();
  const {
    categoria,
    errors,
    setErrors,
    handleActions,
    apiLoading,
  } = useCategorias();
  const { subcategorias } = useSubCategorias();
  const { type, loading, setLoading, setOpen } = useDialog();
  const { values, setValues, handleChange } = useForm();

  /**
   ** Seta os valores quando inicia a form.
   */
  React.useEffect(() => {
    // Trata das subCategoria no render;
    let subCategoriasID = [];
    if (
      categoria &&
      categoria.subCategorias &&
      categoria.subCategorias.length > 0
    ) {
      subCategoriasID = categoria.subCategorias.map((s) => s.id);
      setValues({ ...categoria, subCategorias: subCategoriasID });
    } else {
      setValues(categoria);
    }

    return () => {
      return false;
    };
  }, [setValues, categoria]);

  /**
   ** Quando termina de carregar o get, remove o loading
   */
  React.useEffect(() => {
    if (categoria && categoria.id && !apiLoading) {
      setLoading(false);
    }
  }, [apiLoading, categoria, setLoading]);

  /**
   ** Quando clica no button que faz a action
   */
  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, values).then((resp) =>
        resp ? setOpen(false) : setLoading(false)
      );
    },
    [handleActions, setLoading, setErrors, type, values]
  );

  /**
   ** Recebe uma action, add ou remove uma subcategoria no values corrente.
   * @param {string} action
   * @param {number} ID
   */
  const handleSubCategoria = React.useCallback(
    (action, ID) => {
      // Verifica se o values já tem subcategoria
      let currSubCategorias = !values.subCategorias ? [] : values.subCategorias;

      if (action === "add") {
        currSubCategorias.push(ID);
      } else {
        currSubCategorias = currSubCategorias.filter((c) => c !== ID);
      }

      //& Adiciona o Valor
      setValues({
        ...values,
        subCategorias: currSubCategorias,
      });

      console.log(values);
    },
    [values, setValues]
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={loading ? classes.dialogLoader : null}
    >
      {loading ? (
        <div className={classes.dialogLoader}>
          <CircularProgress />
        </div>
      ) : (
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
              {
                <TransferItems
                  disponiveis={subcategorias}
                  selecionados={values.subCategorias}
                  setValue={handleSubCategoria}
                />
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <SaveButton
              disabled={
                subcategorias && subcategorias.length > 0 ? false : true
              }
            />
          </DialogActions>
        </>
      )}
    </form>
  );
};

const FormDelete = () => {
  const { categoria, handleActions } = useCategorias();
  const { type, closeDialog, setLoading, setOpen } = useDialog();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (handleActions(type, categoria)) {
      setOpen(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <h4>Quer realmente deletar a categorias, {categoria.nome} ?</h4>
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
