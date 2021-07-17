import React,{useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Accordion, AccordionDetails, AccordionActions, AccordionSummary, Grid, Typography } from '@material-ui/core/';
import { ExpandLessSharp, FilterListSharp } from '@material-ui/icons/';
import Select from '../../Components/FormControl/Selects'
import ProcessButton from '../../Components/Buttons/Progress'

//* CONTEXT
import useAtividades from "../../Context/AtividadesContext";
import useSnackBar from '../../Context/SnackBarContext';

//* SERVICE
import { getUsers, getPerfil } from '../../Service/user.service'
import { getClientes, getMyClientes } from '../../Service/clientes.service';
import { getAtividades } from '../../Service/atividade.service';

//* SHEMAS
import { FilterAtividadesSchema} from '../../Schemas/Atividades.Schema'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
    marginTop: '-6rem',
    marginBottom: 10
  },
  details: {
    padding: '30px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
  },
  heading: {
    display: 'flex',
    alignItems: 'end',
    width: '100%',
    cursor: 'default',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    '& p': {
      marginLeft: 15,
      fontSize: 18
    }
  },
  '.MuiAccordionSummary-content': {
    cursor: 'default'
  }
}));

export default () => {
  const classes = useStyles();
  const { setAtividades } = useAtividades();
  const { handleSnackBar } = useSnackBar();
  const [clientes, setClientes] = React.useState([]);
  const [tecnicos, setTecnicos] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    let render = true;

    (async () => {
      try {
        const My = await getPerfil();

        if (!My || !My.success)
          throw new Error('Erro em carregar values do filtro.');

        const u = My.data.role_id === 3 ? My : await getUsers();
        const c =
          My.data.role_id === 3 ? await getMyClientes() : await getClientes();

        if (!c.success || !u.success)
          throw new Error('Em carregar técnicos ou clientes.');

        if (render) {
          setClientes(() => {
            return c.data.map((cliente) => {
              return {
                id: cliente.id,
                nome: cliente.nome_fantasia
              };
            });
          });
          setTecnicos(u.data.length > 2 ? u.data : [u.data]);
        }
      } catch (error) {
        console.log(error);
        console.log(error);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message ? error.message : 'Erro em carregar filtros.'
        });
      }
    })();

    return () => {
      render = false;
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setValues((v) => {
      let values = { ...v };

      if (clientes.length === 1) {
        values = { ...v, cliente: clientes[0].id };
      }

      if (tecnicos.length === 1) {
        values = { ...v, tecnico: tecnicos[0].id };
      }

      return values;
    });
    // eslint-disable-next-line
  }, [clientes, tecnicos]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value
    });
    setErrors({})
  };

  const clearValues = useCallback(() => {
    setValues(() => {
      if (clientes.length <= 1 || tecnicos.length <= 1) {
        return { cliente: values.cliente, tecnico: values.tecnico };
      } else {
        return {};
      }
    });
    setErrors({});
    // eslint-disable-next-line
  }, []);

  const filterAtividades = useCallback(async () => {
    try {
      setLoading(true);
      setSuccess(true);

      if (Object.keys(values).length === 0) {
        const error = await FilterAtividadesSchema(values);
        return setErrors(error.errors);
      }

      if (Boolean(values.data_inicial) && !Boolean(values.data_final)) {
        throw new Error('Data final precisa estar preenchida.');
      }

      if (!Boolean(values.data_inicial) && Boolean(values.data_final)) {
        throw new Error('Data inicial precisa estar preenchida.');
      }

      getAtividades(values)
        .then((resp) => {
          setAtividades(resp)
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      return handleSnackBar({
        type: 'error',
        message: error && error.message ? error.message : 'Erro em carregar atividades filtradas.'
      });
    } finally {
      setLoading(false);
      setSuccess(false);
    }
    //eslint-disable-next-line
  }, [values]);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandLessSharp />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.heading}>
            <FilterListSharp />
            <Typography
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
              Filtros
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                type="date"
                label="Data Inicial"
                variant="outlined"
                title="data_inicial"
                name="data_inicial"
                fullWidth
                value={values.data_inicial ? values.data_inicial : new Date()}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="date"
                label="Data Final"
                variant="outlined"
                title="data_final"
                name="data_final"
                fullWidth
                value={values.data_final ? values.data_final : new Date()}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                title="Clientes"
                name="cliente"
                id="cliente"
                variant="outlined"
                itens={clientes}
                value={values.cliente}
                handleChange={handleChange}
                errorText={errors['cliente']}
                error={errors['cliente'] ? true : false}
                disabled={clientes.length <= 1 ? true : false}
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                title="Técnicos"
                name="tecnico"
                id="tecnico"
                variant="outlined"
                itens={tecnicos}
                value={values.tecnico}
                handleChange={handleChange}
                errorText={errors['tecnico']}
                error={errors['tecnico'] ? true : false}
                disabled={tecnicos.length <= 1 ? true : false}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button variant="outlined" onClick={() => clearValues()}>
            Limpar
          </Button>
          <ProcessButton handleSubmit={filterAtividades} loading={loading} success={success}>
            Filtrar
          </ProcessButton>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
