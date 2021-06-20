import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box,
  IconButton
} from '@material-ui/core';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Requeridos from './Requeridos'
import Atribuidos from './Atribuidos';

import useChamados from '../../Context/ChamadosContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
  },
  button: {
    position: 'absolute',
    right: 20,
    color: 'white',
    height: 40,
    width: 40,
    marginTop: 5,
    '& a': {
      color: 'white',
      padding: 0,
      margin: 0,
      height: 24
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

export default () => {
  const classes = useStyles();
  const { currTab, changeCurrTab } = useChamados();

  return (
  <>
    { currTab !== null && (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={currTab}
          onChange={changeCurrTab}
          aria-label="tab chamados"
        >
          <Tab label="Requeridos" {...a11yProps(0)} />
          <Tab label="Atribuídos" {...a11yProps(1)} />
          <Tab label="Meus Clientes" {...a11yProps(2)} />
        </Tabs>
        <IconButton aria-label="add" className={classes.button}>
          <Link to="/chamado/create">
            <AddCommentIcon />
          </Link>
        </IconButton>
      </AppBar>
      <TabPanel value={currTab} index={0}>
        <Requeridos />
      </TabPanel>
      <TabPanel value={currTab} index={1}>
        <Atribuidos />
      </TabPanel>
      <TabPanel value={currTab} index={2}>
        Chamados que eu sigo
      </TabPanel>
      </div>
      )}
    </>
  );
}
