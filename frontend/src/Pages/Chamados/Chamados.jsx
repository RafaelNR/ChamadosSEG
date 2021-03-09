import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles , AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
import BoxChamado from '../../Components/Box/Chamado';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
          <Tab label="Chamados que criei" {...a11yProps(0)} />
          <Tab label="Chamados pra mim" {...a11yProps(1)} />
          <Tab label="Chamados que eu sigo" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BoxChamado />
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
