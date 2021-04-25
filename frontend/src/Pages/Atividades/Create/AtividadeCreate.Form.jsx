import React from "react";
import {
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  FormHelperText,
  makeStyles
} from '@material-ui/core/';
import {
  Atividade,
  AtividadeTecnico,
  AtividadeCliente,
} from "../../../Components/Box/Atividade";
import Progress from "../../../Components/Buttons/Progress";

//* Service
import { Insert } from "../../../Service/atividade.service";

//* Utils
import { TodayDate } from "../../../Utils/dates";

import useSnackBar from "../../../Context/SnackBarContext";

const useStyles = makeStyles((theme) => ({
  boxgrid: {
    height: '100%',
  },
  title: {
    fontSize: '25px',
    padding: '10px',
    color: theme.palette.text.title
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  errors: {
    marginTop: '30px'
  },
  paper: {
    paddingTop: '16px !important',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
    marginBottom: '10px'
  }
}));

export default ({ setTicket, setAtividadeID, newInfo, clientes, tecnico }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [atividade, setAtividade] = React.useState({
    date: TodayDate(),
    cliente_id: ''
  });
  const [errors, setErrors] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setAtividade(props => {
      return {
        ...props,
        cliente_id: clientes.length === 1 ? clientes[0].id : ''
      }
    })
  },[clientes])

  const handleAtividade = React.useCallback(
    (e) => {
      const key = e.target.name;
      setAtividade({
        ...atividade,
        [key]: e.target.value,
      });

      setErrors({
        ...errors,
        [key]: null,
      });
    },
    [atividade, errors]
  );

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      if (!loading) {
        setSuccess(false);
        setLoading(true);

        Insert(atividade)
          .then((Dados) => {
            if (Dados.error) return setErrors(Dados.errors);

            setSuccess(true);
            setAtividade({
              ...Dados,
              ...atividade
            });
            setTicket(Dados.ticket);
            setAtividadeID(Dados.id);
            newInfo();
            return setErrors([]);
          })
          .catch((error) => {
            setSuccess(false);
            handleSnackBar({
              type: 'error',
              message:
                error && error.message
                  ? error.message
                  : 'Erro em inserir atividade.'
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    // eslint-disable-next-line
    [atividade, setAtividadeID, setTicket, newInfo]
  );

  return (
    <>
      {!success ? (
        <Grid container spacing={2}>
          <Grid item xs={6} className={classes.paper}>
            <Paper>
              <form onSubmit={handleSubmit} autoComplete="off">
                <Grid container spacing={2} className={classes.boxgrid}>
                  <Grid item md={6} className={classes.input}>
                    <FormControl
                      variant="outlined"
                      disabled={success}
                      className={classes.formControl}
                    >
                      <TextField
                        id="date"
                        name="date"
                        label="Data da atividade"
                        type="date"
                        value={atividade.date}
                        onChange={handleAtividade}
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="outlined"
                        error={errors['date'] ? true : false}
                        helperText={errors['date']}
                        disabled={success}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} className={classes.input}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      disabled={success}
                      error={errors['cliente_id'] ? true : false}
                    >
                      <InputLabel id="cliente">
                        {clientes.length === 1
                          ? clientes[0].nome_fantasia
                          : 'Clientes *'}
                      </InputLabel>
                      <Select
                        labelId="cliente"
                        id="cliente_id"
                        name="cliente_id"
                        value={atividade.cliente_id}
                        onChange={handleAtividade}
                        label="Clientes *"
                        required
                        disabled={
                          clientes.length === 1 || success ? true : false
                        }
                      >
                        {clientes &&
                          clientes.length > 0 &&
                          clientes.map((cliente) => {
                            return (
                              <MenuItem key={cliente.id} value={cliente.id}>
                                {cliente.nome_fantasia}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <FormHelperText>{errors['cliente_id']}</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} className={classes.boxgrid}>
                  <Grid item md={12} className={classes.button}>
                    <Progress
                      handleSubmit={handleSubmit}
                      loading={loading}
                      success={success}
                    >
                      Iniciar registros
                    </Progress>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <AtividadeCliente
            Cliente={
              clientes.filter(
                (cliente) => atividade.cliente_id === cliente.id
              )[0]
            }
          />
        </Grid>
      ) : (
        <Grid container spacing={2} className={classes.boxgrid}>
          <Atividade Atividade={atividade} />
          <AtividadeTecnico Tecnico={tecnico} />
          <AtividadeCliente
            Cliente={
              clientes.filter(
                (cliente) => atividade.cliente_id === cliente.id
              )[0]
            }
          />
        </Grid>
      )}
    </>
  );
};
