import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Accordion, AccordionDetails, AccordionActions, AccordionSummary, Grid, Typography } from '@material-ui/core/';
import { ExpandLessSharp, FilterListSharp } from '@material-ui/icons/';
import Select from '../../Components/FormControl/Selects'

//* CONTEXT
import useAtividades from "../../Context/AtividadesContext";

//* SERVICE
import { getUsers, getMyClientes, getPerfil } from '../../Service/user.service'
import { getClientes } from '../../Service/clientes.service'

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
  const { filterAtividades } = useAtividades();
  const [clientes, setClientes] = React.useState([]);
  const [tecnicos, setTecnicos] = React.useState([]);
  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    let render = true;

    (async () => {
      try {
        const My = await getPerfil();

        if (!My || !My.success)
          throw new Error('Erro em carregar dados do filtro.');

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
      }
    })();

    return () => {
      render = false;
    };
  }, []);

  // eslint-disable-next-line
  React.useEffect(() => {
    setValues(v => {
      let Dados = { ...v };

      if (clientes.length === 1) {
        Dados = { ...v, cliente: clientes[0].id };
      }

      if (tecnicos.length === 1) {
        Dados = { ...v, tecnico: tecnicos[0].id };
      }

      return Dados;
    });
  }, [clientes, tecnicos]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value
    });
  };

  const clearValues = () => {
    setValues(() => {
      if (clientes.length <= 1 || tecnicos.length <= 1) {
        return { cliente: values.cliente, tecnico: values.tecnico };
      } else {
        return {};
      }
    });
  };

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
                disabled={tecnicos.length <= 1 ? true : false}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button variant="outlined" onClick={() => clearValues(values)}>
            Limpar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => filterAtividades(values)}
          >
            Filtrar
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
