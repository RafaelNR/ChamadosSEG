import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Footer from './Footer';
import HeaderPage from '../Components/Header';
import SnackBar from '../Components/SnackBar';

import { SnackBarProvider } from '../Context/SnackBarContext';
import { MenuProvider } from '../Context/MenuContext';
import { MythemeProvider } from '../Context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none'
  },
  content: {
    marginLeft: '72px'
  }
}));

const Main = ({ children }) => {
  const classes = useStyles();

  return (
    <MythemeProvider>
      <SnackBarProvider>
        <MenuProvider>
          <AppBar />
          <Drawer />
          <main className={classes.content}>
            <HeaderPage />
            {children}
          </main>
          <Footer />
          <SnackBar />
        </MenuProvider>
      </SnackBarProvider>
    </MythemeProvider>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default React.memo(Main);
