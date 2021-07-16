import React, { useState, useCallback } from 'react';
//* COMPONENTES
import {
  makeStyles,
  DialogContent,
  Grid,
  FormControl,
  TextField,
  CircularProgress,
} from '@material-ui/core/';
import DialogActions from '../../../Components/Dialog/Action';
import { ButtonGerar, ButtonLink } from './Buttons';

//* CONTEXT
import useDialog from '../../../Context/DialogContext';

//* HOOKS
import useForm from '../../../Hooks/useForm';

//* SCHEMA
import {
  GerarLiberacaoTotalSchema,
  GerarLiberacaoSiteAppSchema
} from '../../../Schemas/Pdf.Schema';

//* SERVICE
import {
  LiberacaoTotalPDF,
  LiberacaoSiteAppPDF
} from '../../../Service/pdf.service';

const useStyles = makeStyles(() => ({
  dialogLoader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 800,
    height: 350
  },
  dialog: {
    width: 800
  },
  formControl: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 10
  },
  justificativa: {
    width: '100%',
  }
}));

const FormTotalInput = [
  {
    id: 'ip',
    label: 'IP',
    media: 6
  },
  {
    id: 'mac',
    label: 'MAC',
    media: 6
  },
  {
    id: 'dispositivo',
    label: 'Dispositivo',
    media: 4
  },
  {
    id: 'setor',
    label: 'Setor',
    media: 4
  },
  {
    id: 'usuario',
    label: 'Usuário',
    media: 4
  }
];

const FormTotal = React.memo(() => {
  const classes = useStyles();
  const { values, handleChangeValues} = useForm();
  const { loading, setLoading } = useDialog();
  const [errors, setErrors] = useState([]);
  const [link, setLink] = useState(null);

  React.useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback( async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const Dados = await GerarLiberacaoTotalSchema(values);

      if (Dados.error) throw Dados;

      const resp = await LiberacaoTotalPDF(Dados);

      if (!resp.success) throw 'Erro em gerar o PDF.';

      setLink(resp.data.link);
      setErrors([]);
    } catch (error) {
      console.log(error);
      setErrors(error.errors || []);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[values])

  return (
    <form
      noValidate
      className={loading ? classes.dialogLoader : classes.dialog}
      onSubmit={handleSubmit}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogContent dividers>
            <Grid container>
              {FormTotalInput.map((input, index) => {
                return (
                  <Grid item xs={input.media} key={index}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      error={errors[input.id] ? true : false}
                    >
                      <TextField
                        id={input.id}
                        name={input.id}
                        label={input.label}
                        variant="outlined"
                        onChange={handleChangeValues}
                        value={values[input.id] || ''}
                        error={errors[input.id] ? true : false}
                        helperText={errors[input.id] || ''}
                        fullWidth
                        required
                        disabled={link ? true : false}
                      />
                    </FormControl>
                  </Grid>
                );
              })}
              <Grid item xs={12} md={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors['justificativa'] ? true : false}
                >
                  <TextField
                    id="justificativa" 
                    name="justificativa"
                    label="Justificativa"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={handleChangeValues}
                    value={values.justificativa || ''}
                    error={errors['justificativa'] ? true : false}
                    helperText={errors['justificativa']}
                    required
                    fullWidth
                    disabled={link ? true : false}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
              {
                link ? <ButtonLink link={link} />: <ButtonGerar />
              }
          </DialogActions>
        </>
      )}
    </form>
  );
});

const FormSiteApp = React.memo(() => {
  const classes = useStyles();
  const { values, handleChangeValues } = useForm();
  const { loading, setLoading } = useDialog();
  const [errors, setErrors] = useState([]);
  const [link, setLink] = useState(null);

  React.useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setLoading(true);
        const Dados = await GerarLiberacaoSiteAppSchema(values);

        if (Dados.error) throw Dados;

        const resp = await LiberacaoSiteAppPDF(Dados);

        if (!resp.success) throw 'Erro em gerar o PDF.';

        setLink(resp.data.link);
        setErrors([]);
      } catch (error) {
        console.log(error);
        setErrors(error.errors || []);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values]
  );

  return (
    <form
      noValidate
      className={loading ? classes.dialogLoader : classes.dialog}
      onSubmit={handleSubmit}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogContent dividers>
            <Grid container>
              {FormTotalInput.map((input, index) => {
                return (
                  <Grid item xs={input.media} key={index}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      error={errors[input.id] ? true : false}
                    >
                      <TextField
                        id={input.id}
                        name={input.id}
                        label={input.label}
                        variant="outlined"
                        onChange={handleChangeValues}
                        value={values[input.id] || ''}
                        error={errors[input.id] ? true : false}
                        helperText={errors[input.id] || ''}
                        fullWidth
                        required
                        disabled={link ? true : false}
                      />
                    </FormControl>
                  </Grid>
                );
              })}
              <Grid item xs={12} md={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors['lista'] ? true : false}
                >
                  <TextField
                    id="lista"
                    name="lista"
                    label="Lista de Sites ou Apps"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={handleChangeValues}
                    value={values.lista || ''}
                    error={errors['lista'] ? true : false}
                    helperText={errors['lista']}
                    required
                    fullWidth
                    disabled={link ? true : false}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors['justificativa'] ? true : false}
                >
                  <TextField
                    id="justificativa"
                    name="justificativa"
                    label="Justificativa"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={handleChangeValues}
                    value={values.justificativa || ''}
                    error={errors['justificativa'] ? true : false}
                    helperText={errors['justificativa']}
                    required
                    fullWidth
                    disabled={link ? true : false}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {link ? <ButtonLink link={link} /> : <ButtonGerar />}
          </DialogActions>
        </>
      )}
    </form>
  );
});

export default React.memo(() => {
  const { type } = useDialog();

  switch (type) {
    case 'total':
      return <FormTotal />;
    case 'siteapp':
      return <FormSiteApp />

    default:
      break;
  }
});
