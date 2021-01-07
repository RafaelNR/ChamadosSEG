import React from "react";
import {
  makeStyles,
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@material-ui/core/";
import { SaveInfo } from '../../../Components/Buttons/Atividades';
import { EditInfoAtividade } from "../../../Components/Buttons/Atividades";
import Accordion from "../../../Components/Accordion/Accordion";

//* SERVICE
import { UpdateInfo } from "../../../Service/atividade.service";

//* CONTEXT
import useSnackBar from "../../../Context/SnackBarContext";
import useCategorias from '../../../Context/CategoriasContext';

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
  },
  boxgrid: {
    margin: theme.spacing(1),
    width: "calc(100% + -16px)",
  },
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  input: {
    padding: "8px 0px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  info: {
    padding: "10px",
    width: "calc(100vw - 605px)",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "10px",
  },
}));

export default ({ Info, ticket }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const { categorias } = useCategorias();
  // const [categorias, setCategorias] = React.useState([]);
  const [info, setInfo] = React.useState([]);
  const [errors, setErrors] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  React.useEffect(() => {
    setInfo({
      ...Info,
      ticket,
    })

    // getAllCategorias()
    //   .then((Dados) => {
    //     if (Dados.success) {
    //       setCategorias(Dados.data);
    //       setInfo({
    //         ...Info,
    //         ticket,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     handleSnackBar({
    //       type: "error",
    //       message: err.message,
    //     });
    //   });
  }, [Info, ticket, handleSnackBar]);

  const handleInfo = React.useCallback(
    (e) => {
      const key = e.target.name;
      setInfo({
        ...info,
        [key]: e.target.value,
      });
    },
    [info, setInfo]
  );

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      if (!loading) {
        setSuccess(true);
        setLoading(true);

        UpdateInfo(info)
          .then((Dados) => {
            if (Dados && Dados.error) {
              setSuccess(false);
              setLoading(false);
              return setErrors(Dados.errors);
            }
            setSuccess(true);
            setLoading(false);
            setInfo({
              ...info,
              ...Dados,
            });
            return setErrors([]);
          })
          .catch((err) => {
            console.log(err);
            setSuccess(false);
            setLoading(false);
            handleSnackBar({
              type: "error",
              message: "Erro fazer o update informação da atividade.",
            });
          });
      }
    },
    [info, loading, handleSnackBar]
  );

  const handleEdit = React.useCallback(() => {
    setSuccess(false);
  }, [setSuccess]);

  return (
    <Accordion info={success ? info : null}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid
          container
          spacing={2}
          className={classes.boxgrid}
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
        >
          <Grid item className={classes.input}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              disabled={success}
              error={errors['categorias_id'] ? true : false}
            >
              <InputLabel id="categoria">Categorias *</InputLabel>
              <Select
                labelId="categoria_id"
                id="categoria_id"
                name="categoria_id"
                label="Categorias"
                autoFocus
                onChange={handleInfo}
                value={Info.categoria_id}
                error={errors['categoria_id'] ? true : false}
                helperText={errors['categoria_id']}
                required
              >
                {categorias &&
                  categorias.map((categoria) => {
                    return (
                      <MenuItem key={categorias.id} value={categoria.id}>
                        {categoria.nome}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText>{errors['categoria_id']}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item className={classes.input}>
            <FormControl
              variant="outlined"
              className={classes.info}
              disabled={success}
              error={errors['info'] ? true : false}
            >
              <TextField
                id="descricao"
                name="descricao"
                multiline
                rows={2}
                variant="outlined"
                onChange={handleInfo}
                value={info.descricao}
                error={errors['descricao'] ? true : false}
                helperText={errors['descricao']}
                required
                disabled={success}
              />
            </FormControl>
          </Grid>
          <Grid item style={{ padding: '0px' }} className={classes.buttons}>
            <SaveInfo
              handleSubmit={handleSubmit}
              loading={loading}
              success={success}
            />
            {success && !loading && <EditInfoAtividade handleEdit={handleEdit} />}
          </Grid>
        </Grid>
      </form>
    </Accordion>
  );
};
