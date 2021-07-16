import React from "react";

//* COMPONENTES
import {
  makeStyles,
  DialogContent,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core/";
import TransferItems from "../../Components/ListItens/TransferItens";
import { SaveButton, CancelButton } from "../../Components/Buttons/Index";
import DialogActions from '../../Components/Dialog/Action';

//* CONTEXT
import useCategorias from "../../Context/CategoriasContext";
import useSubCategorias from "../../Context/SubCategoriasContext";
import useDialog from '../../Context/DialogContext';

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
  const [ values, setValues ] = React.useState({})
  const { errors, setCategoria, setErrors, handleActions } = useCategorias();
  const { subcategorias } = useSubCategorias();
  const { type, loading, setLoading, setOpen } = useDialog();

  React.useEffect(() => {
    setCategoria({});
    setErrors({});
    setLoading(false);
  }, [setCategoria,setErrors,setLoading]);

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
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  value={values.nome || ''}
                  id="nome"
                  label="Nome da Categoria"
                  name="nome"
                  type="text"
                  fullWidth
                  required
                  autoFocus={true}
                  onChange={handleChange}
                  error={errors['nome'] ? true : false}
                  helperText={errors['nome']}
                />
              </Grid>
              <TransferItems
                disponiveis={subcategorias}
                selecionados={null}
                setValue={handleSubCategoria}
              />
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
    setCategoria,
    errors,
    setErrors,
    handleActions,
    apiLoading,
  } = useCategorias();
  const { subcategorias } = useSubCategorias();
  const { type, loading, setLoading, setOpen } = useDialog();


  React.useEffect(() => {
    if (
      categoria &&
      categoria.subCategorias &&
      categoria.subCategorias.length > 0
    ) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[categoria])


  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      setErrors(false);
      handleActions(type, categoria).then((resp) =>
        resp ? setOpen(false) : setLoading(false)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, categoria]
  );

  const handleSubCategoria = React.useCallback(
    (action, ID) => {
      // Verifica se o values já tem subcategoria
      let currSubCategorias = !categoria.subCategorias
        ? []
        : categoria.subCategorias;

      if (action === 'add') {
        currSubCategorias.push(ID);
      } else {
        currSubCategorias = currSubCategorias.filter((c) => c !== ID);
      }

      // Adiciona o Valor
      setCategoria((props) => {
        return {
          ...props,
          subCategorias: currSubCategorias
        };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoria]
  );

  const handleChange = React.useCallback(
    (event) => {
      const key = event.target.name;
      const value = event.target.value;
      setCategoria({
        ...categoria,
        [key]: value
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={apiLoading ? classes.dialogLoader : null}
    >
      {apiLoading || loading ? (
        <div className={classes.dialogLoader}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  value={categoria.nome || ''}
                  id="nome"
                  label="Nome da Categoria"
                  name="nome"
                  type="text"
                  fullWidth
                  required
                  autoFocus={true}
                  onChange={handleChange}
                  error={errors['nome'] ? true : false}
                  helperText={errors['nome']}
                />
              </Grid>
              <TransferItems
                disponiveis={subcategorias}
                selecionados={categoria.subCategorias}
                setValue={handleSubCategoria}
              />
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
