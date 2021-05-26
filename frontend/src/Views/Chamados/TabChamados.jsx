import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles , AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
import BoxChamado from '../../Components/Box/Chamado';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const Chamados = [
    {
      id: 1,
      ticket: '0001-2021',
      title: 'Cadastro de dispositivo no firewall',
      cliente: 'CISRU/SAMU',
      categoria: 'Firewall',
      subCategoria: 'Cadastro',
      requerente: 'José Maria',
      atribuido: 'Rafael Rodrigues',
      prioridade: 0,
      anexo: 0,
      interacao: 0,
      fechado: 0
    },
    {
      id: 2,
      ticket: '0002-2021',
      title: 'Alteração de dados do elemento no firewall',
      cliente: 'CISRU/SAMU',
      categoria: 'Firewall',
      subCategoria: 'Alteração',
      requerente: 'José Maria',
      atribuido: 'Rafael Rodrigues',
      prioridade: 1,
      anexo: 0,
      interacao: 0,
      fechado: 0
    }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Requeridos" {...a11yProps(0)} />
          <Tab label="Atribuídos" {...a11yProps(1)} />
          <Tab label="Meus Clientes" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BoxChamado Chamados={Chamados} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Chamados pra mim
      </TabPanel>
      <TabPanel value={value} index={2}>
        Chamados que eu sigo
      </TabPanel>
    </div>
  );
}
