import React from 'react';
import { Grid, TextField, makeStyles, Button, CircularProgress } from '@material-ui/core';
import { SendSharp } from '@material-ui/icons';

//* COMPONENTES
import Select, {
  SelectItem,
  SelectMeses
} from '../../../Components/FormControl/Selects';

//* CONTEXT
import useSnackBar from '../../../Context/SnackBarContext';
import useReportAtividades from '../../../Context/Report.Atividades';

//* SERVICE
import { AtividadesPDF } from '../../../Service/pdf.service';

//* SCHEMAS
import { ReportAtividadesSchema } from '../../../Schemas/Pdf.Schema';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '-6rem'
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20
  },
}));

const ReportData = () => {
  const { type, values, errors, Meses, Anos, handleChange } = useReportAtividades();

  return (
    <>
      {type.data === 'datas' ? (
        <>
          <Grid item xs={4} sm={4}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values && values.data_inicial ? values.data_inicial : null}
              id="data_inicial"
              name="data_inicial"
              label="Data Inicial"
              variant="outlined"
              error={errors && errors.data_inicial ? true : false}
              helperText={errors && errors.data_inicial}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values && values.data_final ? values.data_final : null}
              id="data_final"
              name="data_final"
              label="Data Final"
              variant="outlined"
              error={errors && errors.data_final ? true : false}
              helperText={errors && errors.data_final}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={4} sm={4}>
            {Anos && (
              <SelectItem
                itens={Anos}
                title="Selecione o ano"
                value={values && values.ano ? values.ano : null}
                id="ano"
                name="ano"
                variant="outlined"
                handleChange={handleChange}
                errorText={errors && errors.ano ? errors.ano : ''}
              />
            )}
          </Grid>
          <Grid item xs={4} sm={4}>
            {Meses && (
              <SelectMeses
                itens={Meses}
                title="Selecione o mês"
                value={values && values.mes ? values.mes : null}
                id="mes"
                name="mes"
                variant="outlined"
                handleChange={handleChange}
                errorText={errors && errors.mes ? errors.mes : ''}
              />
            )}
          </Grid>
        </>
      )}
    </>
  );
};

const ReportDados = () => {
  const {
    type,
    values,
    errors,
    clientes,
    tecnicos,
    handleChange
  } = useReportAtividades();

  return (
    <>
      {type.info === 'cliente' ? (
        <Grid item xs={4} sm={4}>
          {clientes && (
            <Select
              itens={clientes}
              title="Selecione o cliente"
              value={values && values.cliente ? values.cliente : null}
              id="cliente"
              name="cliente"
              variant="outlined"
              handleChange={handleChange}
              errorText={errors && errors.cliente ? errors.cliente : ''}
            />
          )}
        </Grid>
      ) : (
        <Grid item xs={4} sm={4}>
          {tecnicos && (
            <Select
              itens={tecnicos}
              title="Selecione o técnico"
              value={values && values.tecnico ? values.tecnico : null}
              id="tecnico"
              name="tecnico"
              variant="outlined"
              handleChange={handleChange}
              errorText={errors && errors.tecnico ? errors.tecnico : ''}
            />
          )}
        </Grid>
      )}
    </>
  );
};

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const { handleSnackBar } = useSnackBar();
  const { values, type, setErrors, setDownload } = useReportAtividades();


  const handleSubmit = React.useCallback(async () => {
    try {
      setLoading(true);
      setErrors(null);
      const Dados = await ReportAtividadesSchema(values, type);
      if (Dados.error) {
        setLoading(false);
        return setErrors(Dados.errors);
      }

      AtividadesPDF(values, type)
        .then(resp => {
          setLoading(false);
          setDownload(resp)
          handleSnackBar({
            type: 'success',
            message: 'PDF gerado com sucesso.'
          });
        })
        .catch((error) => {
          setLoading(false);
          handleSnackBar({
            type: 'error',
            message: error.message ? error.message : 'Erro gerar PDF.'
          });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleSnackBar({
        type: 'error',
        message: error.message
          ? error.message
          : 'Erro gerar PDF.'
      });
    }
  }, [values,handleSnackBar,setDownload,setErrors,type]);



  return (
    <form className={classes.form}>
      <Grid container>
        <ReportData />
        <ReportDados />

        <Grid item xs={12} className={classes.button}>
          {loading ? (
            <Button variant="contained" color="success" disabled={loading}>
              <CircularProgress size={24} />
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SendSharp />}
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </form>
  );
};
