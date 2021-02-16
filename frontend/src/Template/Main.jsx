import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from './AppBar';
import Drawer from './Drawer';
import Footer from './Footer';
import HeaderPage from "../Components/Header";
import SnackBar from "../Components/SnackBar";

import { SnackBarProvider } from "../Context/SnackBarContext";
import { MenuProvider } from "../Context/MenuContext";
import { MythemeProvider } from '../Context/ThemeContext';



const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  content: {
    flexGrow: 1,
    marginLeft: "72px",
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();

  React.useEffect(() => {
    const Ac = new AbortController()

    return function cleanup() {
      Ac.abort();
    }

  })

  return (
    <MythemeProvider>
      <SnackBarProvider>
        <MenuProvider>
          <AppBar />
          <Drawer />
          <HeaderPage />
            <main className={classes.content}>{children}</main>
          <SnackBar />
          <Footer />
        </MenuProvider>
      </SnackBarProvider>
    </MythemeProvider>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Main);
