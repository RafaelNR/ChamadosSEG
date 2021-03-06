import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Accordion,
  AccordionDetails,
  AccordionActions,
  AccordionSummary,
  Grid,
  Typography
} from '@material-ui/core/';
import { ExpandMoreSharp, FilterListSharp } from '@material-ui/icons/';
import Select from '../../Components/FormControl/Selects';
import ProcessButton from '../../Components/Buttons/Progress';

//* CONTEXT
import useAtividades from '../../Context/AtividadesContext';
import useSnackBar from '../../Context/SnackBarContext';

//* SERVICE
import { getUserByCliente } from '../../Service/user.service';
import { getClientes, getMyClientes } from '../../Service/clientes.service';

import { getAtividades } from '../../Service/atividade.service';

//* HOOKS
import useUser from '../../Hooks/useUser';

//* SHEMAS
import { FilterAtividadesSchema } from '../../Schemas/Atividades.Schema';

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
  const { roleID } = useUser();
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

    if (roleID) {
      (async () => {
        try {
          const c = roleID === 3 ? await getMyClientes() : await getClientes();

          if (!c.success) throw new Error('Em carregar técnicos ou clientes.');

          if (render) {
            setClientes(() => {
              return c.data.map((cliente) => {
                return {
                  id: cliente.id,
                  nome: cliente.nome_fantasia
                };
              });
            });
          }
        } catch (error) {
          console.log(error);
          console.log(error);
          handleSnackBar({
            type: 'error',
            message:
              error && error.message
                ? error.message
                : 'Erro em carregar clientes.'
          });
        }
      })();
    }

    return () => {
      render = false;
    };
    // eslint-disable-next-line
  }, [roleID]);

  React.useEffect(() => {
    let render = true;

    if (values.cliente) {
      (async () => {
        try {
          const { success, data } = await getUserByCliente(values.cliente);

          if (render && success) {
            return setTecnicos(data);
          }

          throw new Error('Em carregar técnicos ou clientes.');
        } catch (error) {
          console.log(error);
          handleSnackBar({
            type: 'error',
            message:
              error && error.message
                ? error.message
                : 'Erro em carregar clientes.'
          });
        }
      })();
    }

    return () => {
      render = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.cliente]);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setValues({
      ...values,
      [name]: value
    });
    setErrors({});
  };

  const clearValues = useCallback(() => {
    setValues({});
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const { success, data } = await getAtividades(values);

      if (success) {
        return setAtividades(data);
      }

      throw new Error('Erro ao filtrar atividades.');
    } catch (error) {
      return handleSnackBar({
        type: 'error',
        message:
          error && error.message
            ? error.message
            : 'Erro em carregar atividades filtradas.'
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
          expandIcon={<ExpandMoreSharp />}
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
                disabled={clientes.length === 0 ? true : false}
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
          <ProcessButton
            handleSubmit={filterAtividades}
            loading={loading}
            success={success}
          >
            Filtrar
          </ProcessButton>
        </AccordionActions>
      </Accordion>
    </div>
  );
};
