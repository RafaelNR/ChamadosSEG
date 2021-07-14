import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box,
  Badge,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Requeridos from './Requeridos'
import Atribuidos from './Atribuidos';
import MenuGerarPdf from './Pdf/MenuGerarPdf';
import DialogGerarPdf from './Pdf/GerarPdf.dialog';


import useChamados from '../../Context/ChamadosContext';
import { DialogProvider } from '../../Context/DialogContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
  },
  button: {
    position: 'absolute',
    right: 5,
    background: theme.palette.secondary.main,
    color: 'white',
    top: -50,
    padding: '7px 20px',
    '&:hover': {
      background: theme.palette.secondary.main,
    }
  },
  badge: {
    '& .MuiBadge-badge': {
      top: 10,
      left: -15
    }
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
          {children}
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

function BadgeTitulo(props) {
  const classes = useStyles();
  return (
    <Badge
      badgeContent={props.count}
      color="secondary"
      className={classes.badge}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      {props.titulo}
    </Badge>
  );
}

export default () => {
  const classes = useStyles();
  const { countChamados, currTab, changeCurrTab } = useChamados();

  return (
    <>
      {currTab !== null && (
        <div className={classes.root}>
          <Link to="/chamado/create">
            <Button
              className={classes.button}
              startIcon={<AddIcon size="small" />}
              variant="contained"
            >
              Novo
            </Button>
          </Link>
          <AppBar position="static">
            <Tabs
              value={currTab}
              onChange={changeCurrTab}
              aria-label="tab chamados"
            >
              <Tab
                label={
                  <BadgeTitulo
                    titulo="Requeridos"
                    count={countChamados.requerente}
                  />
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <BadgeTitulo
                    titulo="Atribuídos"
                    count={countChamados.atribuido}
                  />
                }
                {...a11yProps(1)}
              />
              <DialogProvider>
                <MenuGerarPdf />
                <DialogGerarPdf />
              </DialogProvider>
            </Tabs>
          </AppBar>
          <TabPanel value={currTab} index={0}>
            <Requeridos />
          </TabPanel>
          <TabPanel value={currTab} index={1}>
            <Atribuidos />
          </TabPanel>
          {/* <TabPanel value={currTab} index={2}>
        Chamados que eu sigo
      </TabPanel> */}
        </div>
      )}
    </>
  );
}
